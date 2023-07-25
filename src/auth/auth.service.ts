import { forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { errorMessages } from 'src/utils/messages/errorMessages'
import { UserService } from 'src/user/user.service'

import { CreateUserDto } from './../dto/create-user.dto'
import { LoginDto } from 'src/dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    if (!dto.email) throw new UnprocessableEntityException(errorMessages.isEmptyEmail)
    if (!dto.password) throw new UnprocessableEntityException(errorMessages.isEmptyPassword)

    const user = await this.userService.findByEmail(dto.email)
    if (!user) {
      throw new UnprocessableEntityException(errorMessages.isUserNotFound)
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) {
      throw new UnprocessableEntityException(errorMessages.isIncorrectPassword)
    }

    const payload = { sub: user.id, email: user.email }
    const accessToken = await this.generateToken(payload)

    return {
      access_token: accessToken
    }
  }

  async register(dto: CreateUserDto) {
    if (!dto.name) throw new UnprocessableEntityException(errorMessages.isEmptyName)
    if (!dto.email) throw new UnprocessableEntityException(errorMessages.isEmptyEmail)
    if (!dto.password) throw new UnprocessableEntityException(errorMessages.isEmptyPassword)

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const createUserDto: CreateUserDto = { ...dto, password: hashedPassword }

    return await this.userService.create(createUserDto)
  }

  async generateToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '3d'
    })
  }

  decodeToken(token: string) {
    const decodedToken = this.jwtService.verify(token)
    return decodedToken ?? ''
  }

  getTokenFromReq(req): string {
    return req.headers.authorization?.split(' ')[1]
  }
}

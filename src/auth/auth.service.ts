import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { authMessages } from 'src/utils/messages/auth'
import { UserService } from 'src/user/user.service'

import { CreateUserDto } from './../dto/create-user.dto'
import { LoginDto } from 'src/dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    if (!dto.email) throw new UnprocessableEntityException(authMessages.isEmptyEmail)
    if (!dto.password) throw new UnprocessableEntityException(authMessages.isEmptyPassword)
    
    const user = await this.userService.findByEmail(dto.email)
    if (!user) {
      throw new UnprocessableEntityException(authMessages.isUserNotFound)
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) {
      throw new UnprocessableEntityException(authMessages.isIncorrectPassword)
    }

    const payload = { sub: user.id, email: user.email }
    const accessToken = await this.generateToken(payload)

    return {
      access_token: accessToken
    }
  }

  async register(dto: CreateUserDto) {
    if (!dto.name) throw new UnprocessableEntityException(authMessages.isEmptyName)
    if (!dto.email) throw new UnprocessableEntityException(authMessages.isEmptyEmail)
    if (!dto.password) throw new UnprocessableEntityException(authMessages.isEmptyPassword)

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const createUserDto: CreateUserDto = { ...dto, password: hashedPassword }
    return await this.userService.createUser(createUserDto)
  }

  async generateToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '3d'
    })
  }

  async decodeToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token)
      return decodedToken
    } catch (error) {
      return null
    }
  }
}
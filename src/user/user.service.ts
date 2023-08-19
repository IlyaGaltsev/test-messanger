import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Not, Repository } from 'typeorm'

import { errorMessages } from 'src/utils/messages/errorMessages'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from './user.entity'

import { CreateUserDto } from './../dto/create-user.dto'
import { UpdateUserDto } from './../dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async view(authorization: string): Promise<UserEntity> {
    return await this.decodeTokenByFindUser(authorization)
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(dto)
    return await this.userRepository.save(user)
  }

  async update(authorization: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.decodeTokenByFindUser(authorization)

    if (dto.name) {
      user.name = dto.name
    }

    if (dto.avatarPath) {
      user.avatarPath = dto.avatarPath
    }

    if (dto.address) {
      user.address = dto.address
    }

    return await this.userRepository.save(user)
  }

  async decodeTokenByFindUser(authorization: string): Promise<UserEntity> {
    const token = this.authService.getTokenFromAuthorization(authorization)
    if (!token) {
      throw new UnauthorizedException(errorMessages.isNotAccessToken)
    }

    const decodedToken = await this.authService.decodeToken(token)
    if (!decodedToken) {
      throw new UnauthorizedException(errorMessages.faliedDecodeAccessToken)
    }

    const user = await this.findById(decodedToken.sub)
    if (!user) {
      throw new UnauthorizedException(errorMessages.isUserNotFoundInBase)
    }

    return await user
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: Like(email)
      }
    })
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneById(id)
  }

  async getAllUsers() {
    const users = await this.userRepository.find()
    return users
  }

  async fetchEveryoneButMe(authorization: string) {
    const user = await this.decodeTokenByFindUser(authorization)

    if (!user) {
      throw new UnauthorizedException(errorMessages.isUserNotFoundInBase)
    }
    
    const users = await this.userRepository.find({
      where: {
        id: Not(user.id)
      }
    })

    return users
  }
}

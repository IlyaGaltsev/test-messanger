import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

import { CreateUserDto } from './../dto/create-user.dto'
import { errorMessages } from 'src/utils/messages/errorMessages'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async view(req):Promise<UserEntity> {
    const token = this.authService.getTokenFromReq(req)

    if (token) {
      const decodedToken = await this.authService.decodeToken(token)

      if (decodedToken) {
        //! в идеале пароль не должен отдаваться на фронт
        return await this.findById(decodedToken.sub)
      }

      throw new UnauthorizedException(errorMessages.faliedDecodeAccessToken)
    } else {
      throw new UnauthorizedException(errorMessages.isNotAccessToken)
    }
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(dto)
    return await this.userRepository.save(user)
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
}

import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Like, Repository } from 'typeorm'

import { CreateUserDto } from './../dto/create-user.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
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

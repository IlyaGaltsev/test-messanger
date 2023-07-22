import { CreateUserDto } from './../dto/create-user.dto';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: Like(email)
      },
    });
  }

  async getAllUsers() {
    const users = await this.userRepository.find()
    return users
  }
}
// import { authMessages } from './../utils/messages/auth';
// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { hash } from 'argon2';

// import { UserEntity } from './user.entity';
// import { UserDto } from './user.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//   ) {}

//   async byId(id: number) {
//     const user = await this.userRepository.findOne({
//       where: {
//         id,
//       },
//       relations: {
//         contacts: true,
//       },
//       order: {
//         createdAt: 'DESC',
//       },
//     });

//     if (!user) throw new NotFoundException(authMessages.isUserNotFound);

//     return user;
//   }

//   async updateProfile(id: number, dto: UserDto) {
//     const user = await this.byId(id);

//     const isSameUser = await this.userRepository.findOneBy({
//       email: dto.email,
//     });

//     if (isSameUser && id !== isSameUser.id)
//       throw new BadRequestException(authMessages.isLoginBusy);

//     if (dto.password) user.password = await hash(dto.password);

//     user.email = dto.email;
//     user.name = dto.name;
//     user.address = dto.address;
//     user.avatarPath = dto.avatarPath;

//     return this.userRepository.save(user);
//   }

//   async toggleContact() {
//     return true;
//   }

//   async getAll() {
//     return this.userRepository.find();
//   }
// }

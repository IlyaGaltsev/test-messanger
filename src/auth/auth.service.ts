import { CreateUserDto } from './../dto/create-user.dto';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { authMessages } from 'src/utils/messages/auth';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    //! в базе не хранят пароли в чистом виде переделай на шифрование
    if (user?.password !== dto.password) {
      throw new UnauthorizedException(authMessages.isIncorrectPassword);
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    if (!dto.name) throw new UnprocessableEntityException(authMessages.isEmptyName);
    if (!dto.email) throw new UnprocessableEntityException(authMessages.isEmptyEmail);
    if (!dto.password) throw new UnprocessableEntityException(authMessages.isEmptyPassword);
    return await this.usersService.createUser(dto);
  }
}
// import { authMessages } from './../utils/messages/auth';
// import { UserEntity } from './../user/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Repository } from 'typeorm';
// import { hash } from 'argon2';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     private readonly jwtService: JwtService,
//   ) {}

//   async login(dto: AuthDto) {
// const user = await this.valudateUser(dto)

// return {
//     user: this.returnUserFields(user)
//     accessToken: await this.issueAccessToken(user.id)
// }
//   }

//   async register(dto: AuthDto) {
//     const oldUser = await this.userRepository.findOneBy({email: dto.email})

//     if (oldUser ) throw new BadRequestException(authMessages.isLoginBusy)

//     const newUser = await this.userRepository.create({
//         email: dto.email,
//         password: await hash(dto.password)
//     })

//     return {
//         user: this.returnUserFields(user)
//         accessToken: await this.issueAccessToken(user.id)
//     }
//   }

//   async validateUser(dto: AuthDto) {
//     const user = await this.userRepository.findOne({
//         where: {
//             email: dto.email
//         },
//         select: ['id', 'email', 'password']
//     })

//     if(!user) throw new NotFoundException(authMessages.isUserNotFound)

//     return user
//   }

//   async issueAccessToken(userId: number) {
//     const data = {
//         id: userId
//     }

//     return await this.jwtService.signAsync(data, {
//         expiresIn: '31d'
//     })
//   }

//   returnUserFields(user: UserEntity) {
//     return {
//         id: user.id,
//         email: user.email
//     }
//   }

// }

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'

import { MessageController } from './message.controller'
import { MessageEntity } from './message.entity'
import { MessageService } from './message.service'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity])],
  providers: [MessageService, Repository<MessageEntity>, AuthService, UserService],
  controllers: [MessageController]
})
export class MessageModule {}

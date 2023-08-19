import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { RoomParticipantEntity } from 'src/room-participant/room-participant.entity'
import { RoomEntity } from 'src/room/room.entity'
import { RoomService } from 'src/room/room.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'

import { MessageController } from './message.controller'
import { MessageEntity } from './message.entity'
import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity, RoomEntity, RoomParticipantEntity])],
  providers: [
    Repository<MessageEntity>,
    AuthService,
    UserService,
    RoomService,
    MessageGateway,
    MessageService,
  ],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}

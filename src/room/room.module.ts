import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { MessageEntity } from 'src/message/message.entity'
import { MessageService } from 'src/message/message.service'
import { RoomParticipantEntity } from 'src/room-participant/room-participant.entity'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { RoomController } from './room.controller'
import { RoomEntity } from './room.entity'
import { RoomGateway } from './room.gateway'
import { RoomService } from './room.service'

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, MessageEntity, UserEntity, RoomParticipantEntity])],
  providers: [
    Repository<RoomEntity>,
    RoomService,
    UserService,
    AuthService,
    RoomGateway
  ],
  controllers: [RoomController],
  exports: [RoomService]
})
export class RoomModule {}

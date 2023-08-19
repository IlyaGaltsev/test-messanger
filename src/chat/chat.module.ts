import { MessageController } from './../message/message.controller';
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { MessageEntity } from 'src/message/message.entity'
import { MessageGateway } from 'src/message/message.gateway'
import { MessageModule } from 'src/message/message.module'
import { MessageService } from 'src/message/message.service'
import { RoomParticipantEntity } from 'src/room-participant/room-participant.entity'
import { RoomController } from 'src/room/room.controller'
import { RoomEntity } from 'src/room/room.entity'
import { RoomGateway } from 'src/room/room.gateway'
import { RoomService } from 'src/room/room.service'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { RoomModule } from 'src/room/room.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MessageModule,
    UserModule,
    RoomModule,
    TypeOrmModule.forFeature([UserEntity, RoomEntity, RoomParticipantEntity]),
  ],
  providers: [
    UserService,
    AuthService,
    // RoomGateway,
    
    // RoomService,
    // Repository<UserEntity>,
    // Repository<RoomEntity>,

    // MessageService,
    // MessageGateway
    // Repository<MessageEntity>,
    // MessageGateway,
    // MessageService,

  ],
  controllers: [RoomController, MessageController]
})
export class ChatModule {}

import { FetchMessagesDto } from './../dto/fetch-messages.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CreateMessageDto } from 'src/dto/create-message.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() dto: CreateMessageDto) {
    await this.messageService.createMessage(dto)

    this.handleNewMessage(dto.roomId)
  }

  @SubscribeMessage('fecthMessagesInRoom')
  async getAllMessages(@MessageBody() dto:FetchMessagesDto) {
    return await this.messageService.fetchMessagesByRoomId(dto)
  }

  @SubscribeMessage('deleteMessage')
  deleteMessage(@MessageBody() id) {
    return this.messageService.deleteMessage(id)
  }

  async handleNewMessage(roomId: number) {
    const messages = await this.messageService.fetchMessagesByRoomId({roomId})
    this.server.emit('messages', messages)
  }
}

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/dto/create-message.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: true})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() dto: CreateMessageDto) {
    await this.messageService.createMessage(dto)

     this.handleNewMessage();

  }

  @SubscribeMessage('allMessage')
  getAllMessages() {
    return this.messageService.getAllMessages()
  }

  @SubscribeMessage('deleteMessage')
  deleteMessage(@MessageBody() id) {
    return this.messageService.deleteMessage(id)
  }

  async handleNewMessage( ) {
    const messages = await this.messageService.getAllMessages(); // Get all messages including the new one
    this.server.emit('messages', messages); //
  }
}

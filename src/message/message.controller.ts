import { FetchMessagesDto } from './../dto/fetch-messages.dto';
import { CreateMessageDto } from './../dto/create-message.dto'
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('/api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createMessage(@Body() dto: CreateMessageDto) {
    return await this.messageService.createMessage(dto)
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async fetchMessagesInRoom(@Body() dto:FetchMessagesDto) {
    return await this.messageService.fetchMessagesByRoomId(dto)
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteMessage(@Param('id') id: number) {
    return await this.messageService.deleteMessage(id)
  }
}

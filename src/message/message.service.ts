import { UserService } from './../user/user.service'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { MessageEntity } from './message.entity'
import { CreateMessageDto } from 'src/dto/create-message.dto'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const currentUser = await this.userService.findById(dto.userId)

    if (!currentUser) {
      throw new UnauthorizedException('aaaaa пользователя украли')
    }

    const message: MessageEntity = this.messageRepository.create({
      message: dto.message,
      user: currentUser
    })

    return await this.messageRepository.save(message)
  }

  async getAllMessages() {
    try {
      const messages = await this.messageRepository.find({ relations: ['user'] })

      const messagesWithUser = messages.map(message => ({
        ...message,
        user: message.user
      }))

      return messagesWithUser
    } catch (error) {
      throw new InternalServerErrorException('aaaaa что то не попалану пошло a конкретней:' + error)
    }
  }

  async deleteMessage(id: number) {
    await this.messageRepository.delete(id)
  }
}

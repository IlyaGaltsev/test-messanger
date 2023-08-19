import { UserService } from './../user/user.service'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common'
import { MessageEntity } from './message.entity'
import { CreateMessageDto } from 'src/dto/create-message.dto'
import { UserEntity } from 'src/user/user.entity'
import { errorMessages } from 'src/utils/messages/errorMessages'
import { RoomService } from 'src/room/room.service'
import { FetchMessagesDto } from 'src/dto/fetch-messages.dto'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly roomService: RoomService
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const user = await this.userService.findById(dto.userId)
    const room = await this.roomService.findById(dto.roomId)

    if (!user) {
      throw new UnauthorizedException(errorMessages.isUserNotFoundInBase)
    }

    if (!room) {
      throw new UnprocessableEntityException('чувак, извиняй, нет такой комнаты')
    }

    const message: MessageEntity = this.messageRepository.create({
      message: dto.message,
      user,
      room
    })

    return await this.messageRepository.save(message)
  }

  async fetchMessagesByRoomId(dto: FetchMessagesDto): Promise<MessageEntity[]> {
    const {roomId} = dto

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user')
      .leftJoinAndSelect('message.room', 'room')
      .where('message.room_id = :roomId', { roomId })
      .getMany()

    return messages
  }

  async findLastMessageByRoomId(roomId: number): Promise<MessageEntity | null> {
    const message = await this.messageRepository.createQueryBuilder('message')
      .where('message.roomId = :roomId', { roomId })
      .orderBy('message.createdAt', 'DESC')
      .getOne();

    return message || null;
  }

  async fetchMessagesInRoom(dto: FetchMessagesDto) {
    try {
      const messages = await this.messageRepository.find({ relations: ['user'] })

      const messagesWithUser = messages.map(message => ({
        ...message,
        user: message.user
      }))

      return messagesWithUser
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async deleteMessage(id: number) {
    await this.messageRepository.delete(id)
  }
}

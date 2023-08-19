import { UpdateRoomDto } from './../dto/update-room.dto';
import { FetchRoomsDto } from './../dto/fecth-rooms.dto'
import { UserService } from './../user/user.service'
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateRoomDto } from 'src/dto/create-room.dto'
import { errorMessages } from 'src/utils/messages/errorMessages'
import { Repository } from 'typeorm'
import { RoomEntity } from './room.entity'
import { RoomParticipantEntity } from 'src/room-participant/room-participant.entity'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomParticipantEntity)
    private readonly participantRepository: Repository<RoomParticipantEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    private readonly userService: UserService
  )
  {}

  async findRoomsByRoomId(roomId: number) {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.participants', 'participants')
      .where('room.roomId = :roomId', { roomId })
      .getMany()

    return rooms
  }

  async findRoomsByUserId2(userId: number) {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'participantUser')
      .leftJoinAndSelect('room.messages', 'message')
      .where('participantUser.id = :userId', { userId })
      .orderBy('room.createdAt', 'DESC')
      .addOrderBy('message.createdAt', 'DESC')
      .getMany()

    return rooms
  }

  async findRoomsByUserId(dto: FetchRoomsDto) {
    const { userId } = dto
    const rooms = await this.findRoomsByUserId2(userId)

    return rooms
  }

  async createRoom(dto: CreateRoomDto) {
    const owner = await this.userService.findById(dto.owner)

    const room = new RoomEntity()
    room.name = dto.name
    room.avatar = dto.avatar
    room.owner = owner
    const createdRoom = await this.roomRepository.save(room)
    let participantsArray = []

    if (typeof dto.participants === 'string') {
      participantsArray = JSON.parse(dto.participants)
    } else {
      participantsArray = dto.participants
    }

    participantsArray.map(async (participantId: number) => {
      const participant = new RoomParticipantEntity()
      participant.room = createdRoom
      participant.user = await this.userService.findById(participantId)
      await this.participantRepository.save(participant)
    })

    // добавь проверку на существавание user'ов c такими id

    return createdRoom

    // const currentUser = await this.userService.findById(dto.ownerId)

    // if (!currentUser) {
    //   throw new UnauthorizedException(errorMessages.isUserNotFoundInBase)
    // }

    // const room  = this.roomRepository.create({
    //   name: dto.name,
    //   participantsIds: dto.participantsIds,
    //   ownerId: dto.ownerId
    // })

    // this.messageGateway.handleNewMessage();

    // return await this.roomRepository.save(room)
  }

  async updateRoom(dto: UpdateRoomDto) {
    const room = await this.findById(dto.id)

    if (dto.name) {
      room.name = dto.name
    }

    if (dto.avatar) {
      room.avatar = dto.avatar
    }

    return await this.roomRepository.save(room)
  }

  async deleteRoom() {
    return await 'deleteRoom'
  }

  async findById(id: number): Promise<RoomEntity | undefined> {
    return await this.roomRepository.findOneById(id)
  }
}

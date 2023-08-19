import { UpdateRoomDto } from 'src/dto/update-room.dto'
import { RoomService } from 'src/room/room.service'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CreateRoomDto } from 'src/dto/create-room.dto'
import { FetchRoomsDto } from 'src/dto/fecth-rooms.dto'

@WebSocketGateway({ cors: true })
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('createRoom')
  async createMessage(@MessageBody() dto: CreateRoomDto) {
    await this.roomService.createRoom(dto)

    this.handleNewRoom(dto.owner)
  }

  @SubscribeMessage('updateRoom')
  async updateRoom(@MessageBody() dto: UpdateRoomDto) {
    await this.roomService.updateRoom(dto)

    this.handleNewRoom(dto.owner)
  }

  @SubscribeMessage('fetchRooms')
  async fetchRooms(@MessageBody() dto: FetchRoomsDto) {
    return await this.roomService.findRoomsByUserId(dto)
  }

  async handleNewRoom(userId: number) {
    const rooms = await this.roomService.findRoomsByUserId({ userId })
    this.server.emit('rooms', rooms)
  }
}

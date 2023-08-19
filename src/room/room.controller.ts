import { Body, Controller, Delete, Get, Headers, Post, Put, Req } from '@nestjs/common'
import { CreateRoomDto } from 'src/dto/create-room.dto'
import { FetchRoomsDto } from 'src/dto/fecth-rooms.dto'
import { UpdateRoomDto } from 'src/dto/update-room.dto'
import { RoomService } from './room.service'

@Controller('/api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  async fetchRooms(@Body() dto: FetchRoomsDto) {
    return await this.roomService.findRoomsByUserId(dto)
  }

  @Post('/')
  async createRoom(@Body() dto: CreateRoomDto) { 
    return await this.roomService.createRoom(dto)
  }

  @Put('/')
  async updateRoom(@Body() dto: UpdateRoomDto) {
    return await this.roomService.updateRoom(dto)
  }

  @Delete('/')
  async deleteRoom() {
    return await this.roomService.deleteRoom()
  }
}

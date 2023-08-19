import { UpdateUserDto } from './../dto/update-user.dto'
import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  Headers
} from '@nestjs/common'

import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService, private readonly authService: AuthService) {}

  @Get('view')
  @UseGuards(AuthGuard)
  async userView(@Headers() {authorization}) {
    return await this.userService.view(authorization)
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async userUpdate(@Headers() {authorization}, @Body() dto: UpdateUserDto) {
    return await this.userService.update(authorization, dto)
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async fetchUsersAll() {
    return await this.userService.getAllUsers()
  }

  @Get('everyone-but-me')
  @UseGuards(AuthGuard)
  async fetchEveryoneButMe(@Headers() {authorization}) {
    return await this.userService.fetchEveryoneButMe(authorization)
  }
}

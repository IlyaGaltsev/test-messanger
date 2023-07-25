import { Controller, Get, Req, UnauthorizedException, Put, UseGuards } from '@nestjs/common'

import { errorMessages } from 'src/utils/messages/errorMessages'
import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService, private readonly authService: AuthService) {}

  @Get('view')
  @UseGuards(AuthGuard)
  async userView(@Req() req) {
    return await this.userService.view(req)
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async profileUpdate() {
    //Todo в разработке
  }
}

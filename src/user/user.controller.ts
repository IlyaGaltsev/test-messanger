import { Controller, Get, Req, UnauthorizedException, Put, UseGuards } from '@nestjs/common'

import { authMessages } from 'src/utils/messages/auth'
import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService, private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {
    //! вынеси в сервис если время останется
    const token = req.headers.authorization?.split(' ')[1]

    if (token) {
      const decodedToken = await this.authService.decodeToken(token)

      if (decodedToken) {
        //! в идеале пароль не должен отдаваться на фронт
        return await this.userService.findByEmail(decodedToken.email)
      }

      throw new UnauthorizedException(authMessages.faliedDecodeAccessToken)
    } else {
      throw new UnauthorizedException(authMessages.isNotAccessToken)
    }
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async profileUpdate() {
    //Todo в разработке
  }
}

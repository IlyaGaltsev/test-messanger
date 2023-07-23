import { UserService } from './user.service'
import { CreateUserDto } from './../dto/create-user.dto'
import { Body, Controller, Post, Get, Req, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { authMessages } from 'src/utils/messages/auth'

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private readonly authService: AuthService) {}

  // update

  @Get('profile')
  async getProfile(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1]

    if (token) {
      const decodedToken = await this.authService.decodeToken(token)

      if (decodedToken) {
        //! в идеале пароль не должен отдаваться на фронт
        return this.userService.findByEmail(decodedToken.email)
      }

      throw new UnauthorizedException(authMessages.faliedDecodeAccessToken)
    } else {
      throw new UnauthorizedException(authMessages.isNotAccessToken)
    }
  }
}

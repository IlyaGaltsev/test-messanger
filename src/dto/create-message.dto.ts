import { UserEntity } from 'src/user/user.entity'

export class CreateMessageDto {
  readonly message: string
  readonly userId: number
  readonly roomId: number
}

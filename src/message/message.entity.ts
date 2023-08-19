import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { RoomEntity } from 'src/room/room.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'

@Entity('Message')
export class MessageEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string

  @ManyToOne(() => UserEntity, user => user.messages)
  user: UserEntity;

  @ManyToOne(() => RoomEntity, room => room.messages)
  room: RoomEntity;
}

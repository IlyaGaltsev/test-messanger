import { MessageEntity } from 'src/message/message.entity'
import { RoomEntity } from 'src/room/room.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn,JoinTable, ManyToMany, OneToMany } from 'typeorm'

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: '' })
  name: string

  @Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
  avatarPath: string

  @Column({ default: '', type: 'text' })
  address: string

  @OneToMany(() => MessageEntity, message => message.user, { onDelete: 'CASCADE' })
  messages: MessageEntity[]

  @OneToMany(() => RoomEntity, room => room.owner)
  rooms: RoomEntity[];
}

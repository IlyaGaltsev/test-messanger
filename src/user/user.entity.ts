import { MessageEntity } from 'src/message/message.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'

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
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'

import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'

@Entity('Message')
export class MessageEntity extends Base {
  @Column({ default: '', type: 'text' })
  message: string

  @ManyToOne(() => UserEntity, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, ManyToOne } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { MessageEntity } from 'src/message/message.entity'
import { Base } from 'src/utils/base'
import { RoomParticipantEntity } from 'src/room-participant/room-participant.entity'

@Entity('Room')
export class RoomEntity extends Base {
  @Column()
  name: string

  @Column({ nullable: true })
  avatar: string

  @ManyToOne(() => UserEntity, user => user.rooms)
  owner: UserEntity

  @OneToMany(() => RoomParticipantEntity, participant => participant.room)
  participants: RoomParticipantEntity[]

  @OneToMany(() => MessageEntity, message => message.room)
  messages: MessageEntity[]
}

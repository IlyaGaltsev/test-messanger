import { RoomEntity } from 'src/room/room.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { Base } from 'src/utils/base'

@Entity()
export class RoomParticipantEntity extends Base {
  @ManyToOne(() => UserEntity, { eager: true }) // Use eager: true to fetch the associated UserEntity
  user: UserEntity

  @ManyToOne(() => RoomEntity, room => room.participants)
  room: RoomEntity
}

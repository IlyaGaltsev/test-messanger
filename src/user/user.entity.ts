import { Base } from 'src/utils/base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '/uploads/default-avatar.png', name: 'avatar_path' })
  avatarPath: string;

  @Column({ default: '', type: 'text' })
  address: string;

//   @OneToMany(() => UserEntity, (user: any) => user.id, { cascade: true })
//   contacts: UserEntity[];
}

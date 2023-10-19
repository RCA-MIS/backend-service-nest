/* eslint-disable */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { EProjectStatus } from 'src/Enum/EProjectStatus.enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: EProjectStatus;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}

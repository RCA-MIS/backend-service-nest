/* eslint-disable */
import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image : string;

  @ManyToOne(() => User)
  writer: User;

  @Column()
  likes: number;

  @Column()
  createdAt: Date;

  @Column({nullable: true})
  updatedAt: Date;
}

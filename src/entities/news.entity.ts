/* eslint-disable */
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { hasSubscribers } from 'diagnostics_channel';

@Entity()
export class News extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  shortDescription: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  longtDescription: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User)
  writer: User;

  @Column({ nullable: true })
  likes: number;

  @Column({nullable: true})
  attachment : string;

  constructor(
    title: string,
    shortDesc: string,
    longDesc: string,
    image: string,
    attachment : string
  ) {
    super();
    this.title = title;
    this.shortDescription = shortDesc;
    this.longtDescription = longDesc;
    this.image = image;
    this.attachment = attachment;
  }
}

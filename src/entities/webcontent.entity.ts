import { language } from 'googleapis/build/src/apis/language';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('web_content')
export class WebContent extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({
    name: 'landing_burner_image',
  })
  LandingBurnerImage: string;

  @JoinColumn({
    name: 'aboutus_main_image',
  })
  aboutUsMainImage: string;

  @JoinColumn({
    name: 'innovations_main_image',
  })
  InnovationsMainImage: string;

  @JoinColumn({
    name: 'newsletter_card_image',
  })
  newsLetterCardImage: string;

  @JoinColumn({
    name: 'newsletter_large_image',
  })
  newsLetterLargeImage: string;

  @Column()
  aboutUsText: string;

  @Column()
  innovationText: string;

  @Column({
    nullable: true,
  })
  yearsOfFoundation: number;

  @Column()
  studentsNumber: number;

  @Column()
  startupsNumber: number;

  @Column()
  schoolEmail: string;

  @Column()
  slackWorkspaceLink: string;

  @Column()
  DiscordServerLink: string;

  @Column()
  FacebookLink: string;

  @Column()
  InstgramLink: string;

  @Column()
  schoolPhoneNumber: string;

  @Column()
  TwitterLink: string;

  @Column()
  LinkedInLink: string;

  @Column()
  githubLink: string;

  @Column()
  snapchatLink: string;
  
}

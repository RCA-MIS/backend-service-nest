import { language } from 'googleapis/build/src/apis/language';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { File } from '../fileHandling/File';
import { UUID } from 'crypto';

@Entity('web_content')
export class WebContent extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: UUID;
  // https://drive.google.com/drive/folders/1kXgwHz-vZCJ50_o77lne44WNZYw82AxI?usp=sharing
  @JoinColumn({
    name: 'landing_burner_image',
  })
  LandingBurnerImage: File;
  @JoinColumn({
    name: 'aboutus_main_image',
  })
  aboutUsMainImage: File;
  @JoinColumn({
    name: 'innovations_main_image',
  })
  InnovationsMainImage: File;
  @JoinColumn({
    name: 'newsletter_card_image',
  })
  newsLetterCardImage: File;
  @JoinColumn({
    name: 'newsletter_large_image',
  })
  newsLetterLargeImage: File;
  @Column()
  aboutUsText: String;
  @Column()
  innovationText: String;
  @Column({
    nullable: true,
  })
  yearsOfFoundation: number;
  // @Column('stake_holders_and_patterns')
  // @OneToMany(() => File)
  // stakeHoldersAndPatterners: File[];
  @Column()
  studentsNumber: number;
  @Column()
  startupsNumber: number;
  @Column()
  schoolEmail: String;
  @Column()
  slackWorkspaceLink: String;
  @Column()
  DiscordServerLink: String;
  @Column()
  FacebookLink: String;
  @Column()
  InstgramLink: String;
  @Column()
  schoolPhoneNumber: String;
  @Column()
  TwitterLink: String;
  @Column()
  LinkedInLink: String;
  @Column()
  githubLink: String;
  @Column()
  snapchatLink: String;

  constructor(
    // LandingBurnerImage: File,
    // aboutUsMainImage: File,
    // InnovationsMainImage: File,
    // newsLetterLargeImage: File,
    // newsLetterCardImage: File,
    aboutUsText: String,
    innovationText: String,
    yearsOfFoundation: number,
    // stakeHoldersAndPatterners: File[];
    studentsNumber: number,
    startupsNumber: number,
    schoolEmail: String,
    slackWorkspaceLink: String,
    DiscordServerLink: String,
    FacebookLink: String,
    InstgramLink: String,
    schoolPhoneNumber: String,
    TwitterLink: String,
    LinkedInLink: String,
    githubLink: String,
    snapchatLink: String,
  ) {
    super();
    this.DiscordServerLink = DiscordServerLink;
    this.TwitterLink = TwitterLink;
    this.studentsNumber = studentsNumber;
    // this.LandingBurnerImage = LandingBurnerImage;
    this.InstgramLink = InstgramLink;
    this.schoolEmail = schoolEmail;
    this.schoolPhoneNumber = schoolPhoneNumber;
    this.LinkedInLink = LinkedInLink;
    this.githubLink = githubLink;
    this.snapchatLink = snapchatLink;
    this.FacebookLink = FacebookLink;
    this.startupsNumber = startupsNumber;
    this.slackWorkspaceLink = slackWorkspaceLink;
    this.innovationText = innovationText;
    // this.aboutUsMainImage = aboutUsMainImage;
    // this.InnovationsMainImage = InnovationsMainImage;
    // this.newsLetterCardImage = newsLetterCardImage;
    // this.newsLetterLargeImage = newsLetterLargeImage;
    this.aboutUsText = aboutUsText;
  }
}

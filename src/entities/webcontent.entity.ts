import { language } from 'googleapis/build/src/apis/language';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('web_content')
export class WebContent extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'landing_burner_image',
  })
  LandingBurnerImage: string;

  @Column({
    name: 'aboutus_main_image',
  })
  aboutUsMainImage: string;

  @Column({
    name: 'innovations_main_image',
  })
  InnovationsMainImage: string;

  @Column({
    name: 'newsletter_card_image',
  })
  newsLetterCardImage: string;

  @Column({
    name: 'newsletter_large_image',
  })
  newsLetterLargeImage: string;

  @Column({
    name: 'about_us_text',
  })
  aboutUsText: string;

  @Column({
    name: 'innovation_text',
  })
  innovationText: string;

  @Column({
    nullable: true,
    name: 'years_of_foundation',
  })
  yearsOfFoundation: number;

  @Column({
    name: 'students_number',
  })
  studentsNumber: number;

  @Column()
  startupsNumber: number;

  @Column({
    name: 'school_name',
  })
  schoolEmail: string;

  @Column({
    name: 'slack_workspace_link',
  })
  slackWorkspaceLink: string;

  @Column({
    name: 'facebook_link',
  })
  FacebookLink: string;

  @Column({
    name: 'instagram_link',
  })
  InstgramLink: string;

  @Column({
    name: 'school_phone_number',
  })
  schoolPhoneNumber: string;

  @Column({
    name: 'tweeter_link',
  })
  TwitterLink: string;

  @Column({ name: 'linkedIn_link' })
  LinkedInLink: string;

  @Column({ name: 'github_link' })
  githubLink: string;

  constructor(
    instagramLink: string,
    aboutUsText: string,
    landingBurnerImage: string,
    startUpsNumber: number,
    schoolEmail: string,
    slackWorspaceLink: string,
    facebookLink: string,
    aboutUsImage: string,
    schoolPhoneNumber: string,
    twitterLink: string,
    LinkedInLink: string,
    githubLink: string,
    innovationMainImage: string,
    newsLetterCardImage: string,
    newsLetterLargeImage: string,
    innovationImageText: string,
    yearsOfExperience: number,
    studentsNumber: number,
  ) {
    super();
    this.LandingBurnerImage = landingBurnerImage;
    this.startupsNumber = startUpsNumber;
    this.schoolEmail = schoolEmail;
    this.slackWorkspaceLink = slackWorspaceLink;
    this.FacebookLink = facebookLink;
    this.aboutUsMainImage = aboutUsImage;
    this.schoolPhoneNumber = schoolPhoneNumber;
    this.TwitterLink = twitterLink;
    this.LinkedInLink = LinkedInLink;
    this.githubLink = githubLink;
    this.innovationText = innovationImageText;
    this.InnovationsMainImage = innovationMainImage;
    this.newsLetterLargeImage = newsLetterLargeImage;
    this.newsLetterCardImage = newsLetterCardImage;
    this.yearsOfFoundation = yearsOfExperience;
    this.studentsNumber = studentsNumber;
    this.aboutUsText = aboutUsText;
    this.InstgramLink = instagramLink;
  }
}

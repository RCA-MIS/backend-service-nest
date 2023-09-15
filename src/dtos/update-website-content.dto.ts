import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWebContentDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  yearsOfFoundation: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  studentsNumber: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  startupsNumber: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  aboutUsText: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  innovationText: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schoolEmail: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  slackWorkspaceLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  DiscordServerLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  FacebookLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  snapchatLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  InstgramLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schoolPhoneNumber: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  TwitterLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  LinkedInLink: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  githubLink: String;
}

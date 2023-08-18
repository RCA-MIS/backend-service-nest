import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { File } from '../fileHandling/File';

export class UpdateWebContentDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  yearsOfFoundation: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  studentsNumber: number;
  @IsNotEmpty()
  @IsNumber()
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

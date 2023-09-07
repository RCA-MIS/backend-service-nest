import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWebsiteContentDTO } from 'src/dtos/create-website-content.dto';
import { WebContent } from 'src/entities/webcontent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebContentService {
  // constructor(
  //   @InjectRepository(WebContent)
  //   private webContentRepository: Repository<WebContent>,
  // ) {}

  // async createWebContent(dto: CreateWebsiteContentDTO) {
  //   const isContentAvailable = await this.webContentRepository.find();
  //   if (isContentAvailable)
  //     throw new ForbiddenException(
  //       'The content is already there, you can update it only',
  //     );
  //   const websiteContent = new WebContent(
  //     //   dto.LandingBurnerImage,
  //     //   dto.aboutUsMainImage,
  //     //   dto.InnovationsMainImage,
  //     //   dto.newsLetterLargeImage,
  //     //   dto.newsLetterCardImage,
  //     dto.aboutUsText,
  //     dto.innovationText,
  //     dto.yearsOfFoundation,
  //     // stakeHoldersAndPatterners: File[];
  //     dto.studentsNumber,
  //     dto.startupsNumber,
  //     dto.schoolEmail,
  //     dto.slackWorkspaceLink,
  //     dto.DiscordServerLink,
  //     dto.FacebookLink,
  //     dto.InstgramLink,
  //     dto.schoolPhoneNumber,
  //     dto.TwitterLink,
  //     dto.LinkedInLink,
  //     dto.githubLink,
  //     dto.snapchatLink,
  //   );

  //   const websiteContentEntity = await this.webContentRepository.create(
  //     websiteContent,
  //   );
  //   return await this.webContentRepository.save(websiteContentEntity);
  // }

  // async UpdateContent(dto: Partial<WebContent>) {
  //   const availableContent: WebContent[] =
  //     await this.webContentRepository.find();
  //   if (!availableContent || availableContent.length == 0)
  //     throw new NotFoundException(
  //       'There is no web content instance registered, please create new one!',
  //     );
  //   const websiteContent = new WebContent(
  //     //   dto.LandingBurnerImage,
  //     //   dto.aboutUsMainImage,
  //     //   dto.InnovationsMainImage,
  //     //   dto.newsLetterLargeImage,
  //     //   dto.newsLetterCardImage,
  //     dto.aboutUsText,
  //     dto.innovationText,
  //     dto.yearsOfFoundation,
  //     // stakeHoldersAndPatterners: File[];
  //     dto.studentsNumber,
  //     dto.startupsNumber,
  //     dto.schoolEmail,
  //     dto.slackWorkspaceLink,
  //     dto.DiscordServerLink,
  //     dto.FacebookLink,
  //     dto.InstgramLink,
  //     dto.schoolPhoneNumber,
  //     dto.TwitterLink,
  //     dto.LinkedInLink,
  //     dto.githubLink,
  //     dto.snapchatLink,
  //   );
  //   Object.assign(availableContent[0], dto);
  //   return this.webContentRepository.save(availableContent[0]);
  // }
}

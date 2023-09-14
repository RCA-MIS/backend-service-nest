import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWebsiteContentDTO } from 'src/dtos/create-website-content.dto';
import { UpdateWebContentDTO } from 'src/dtos/update-website-content.dto';
import { WebContent } from 'src/entities/webcontent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebContentService {
  constructor(
    @InjectRepository(WebContent)
    private webContentRepository: Repository<WebContent>,
  ) {}

  async getContent() {
    try {
      return await this.webContentRepository.find({});
    } catch (error) {
      throw error;
    }
  }

  async createWebContent(dto: CreateWebsiteContentDTO) {
    const isContentAvailable = await this.webContentRepository.find();
    if (isContentAvailable == null)
      throw new ForbiddenException(
        'The content is already there, you can update it only',
      );
    const websiteContent = new WebContent(
      dto.InstgramLink.toString(),
      dto.aboutUsText.toString(),
      '',
      0,
      dto.schoolEmail.toString(),
      dto.slackWorkspaceLink.toString(),
      dto.FacebookLink.toString(),
      '',
      dto.schoolPhoneNumber.toString(),
      dto.TwitterLink.toString(),
      dto.LinkedInLink.toString(),
      dto.githubLink.toString(),
      dto.innovationText.toString(),
      '',
      '',
      '',
      dto.yearsOfFoundation,
      dto.studentsNumber,
    );

    const websiteContentEntity = await this.webContentRepository.create(
      websiteContent,
    );
    return await this.webContentRepository.save(websiteContentEntity);
  }

  async UpdateContent(dto: Partial<UpdateWebContentDTO>) {
    const availableContent: WebContent[] =
      await this.webContentRepository.find();
    if (!availableContent || availableContent.length == 0)
      throw new NotFoundException(
        'There is no web content instance registered, please create new one!',
      );
    const websiteContent = new WebContent(
      dto.InstgramLink.toString(),
      dto.aboutUsText.toString(),
      '',
      0,
      dto.schoolEmail.toString(),
      dto.slackWorkspaceLink.toString(),
      dto.FacebookLink.toString(),
      '',
      dto.schoolPhoneNumber.toString(),
      dto.TwitterLink.toString(),
      dto.LinkedInLink.toString(),
      dto.githubLink.toString(),
      dto.innovationText.toString(),
      '',
      '',
      '',
      dto.yearsOfFoundation,
      dto.studentsNumber,
    );
    Object.assign(availableContent[0], dto);
    return this.webContentRepository.save(availableContent[0]);
  }
}

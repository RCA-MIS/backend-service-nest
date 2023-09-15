import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWebsiteContentDTO } from 'src/dtos/create-website-content.dto';
import { UpdateWebContentDTO } from 'src/dtos/update-website-content.dto';
import { WebContent } from 'src/entities/webcontent.entity';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';

@Injectable()
export class WebContentService {
  constructor(
    @InjectRepository(WebContent)
    private webContentRepository: Repository<WebContent>,
    private fileService: FilesService,
  ) {}

  async getContent() {
    try {
      await this.webContentRepository.delete({});
      return await this.webContentRepository.find({});
    } catch (error) {
      throw error;
    }
  }

  async createWebContent(
    dto: CreateWebsiteContentDTO,
    abouUsImage?: Express.Multer.File[],
    landingBurnerImage?: Express.Multer.File[],
    innovationMainImage?: Express.Multer.File[],
    newsLetterCardImage?: Express.Multer.File[],
    newsLetterLargeImage?: Express.Multer.File[],
  ) {
    const aboutUsImage = await this.fileService.uploadArrayOfFiles(abouUsImage);
    const burnerImage = await this.fileService.uploadArrayOfFiles(
      landingBurnerImage,
    );
    const innovationMainImg = await this.fileService.uploadFile(
      innovationMainImage[0],
    );
    const newsLetterCardImg = await this.fileService.uploadFile(
      newsLetterCardImage[0],
    );
    const newsLetterLargeImag = await this.fileService.uploadFile(
      newsLetterLargeImage[0],
    );
    const isContentAvailable = await this.webContentRepository.find();
    if (isContentAvailable == null)
      throw new ForbiddenException(
        'The content is already there, you can update it only',
      );

    const websiteContent = new WebContent(
      '',
      dto.aboutUsText.toString(),
      burnerImage,
      0,
      dto.schoolEmail.toString(),
      dto.slackWorkspaceLink.toString(),
      dto.FacebookLink.toString(),
      aboutUsImage,
      dto.schoolPhoneNumber.toString(),
      dto.TwitterLink.toString(),
      dto.LinkedInLink.toString(),
      dto.githubLink.toString(),
      dto.innovationText.toString(),
      innovationMainImg,
      newsLetterCardImg,
      newsLetterLargeImag,
      dto.yearsOfFoundation,
      dto.studentsNumber,
    );

    const websiteContentEntity = await this.webContentRepository.create(
      websiteContent,
    );
    return await this.webContentRepository.save(websiteContentEntity);
  }

  async UpdateContent(
    dto: Partial<UpdateWebContentDTO>,
    abouUsImage?: Express.Multer.File[],
    landingBurnerImage?: Express.Multer.File[],
    innovationMainImage?: Express.Multer.File[],
    newsLetterCardImage?: Express.Multer.File[],
    newsLetterLargeImage?: Express.Multer.File[],
  ) {
    const availableContent: WebContent[] =
      await this.webContentRepository.find();
    if (!availableContent || availableContent.length == 0)
      throw new NotFoundException(
        'There is no web content instance registered, please create new one!',
      );

    const aboutUsImage = await this.fileService.uploadArrayOfFiles(abouUsImage);
    const burnerImage = await this.fileService.uploadArrayOfFiles(
      landingBurnerImage,
    );

    const innovationMainImg = await this.fileService.uploadFile(
      innovationMainImage[0],
    );
    const newsLetterCardImg = await this.fileService.uploadFile(
      newsLetterCardImage[0],
    );
    const newsLetterLargeImag = await this.fileService.uploadFile(
      newsLetterLargeImage[0],
    );

    const websiteContent = new WebContent(
      '',
      dto.aboutUsText.toString(),
      burnerImage,
      0,
      dto.schoolEmail.toString(),
      dto.slackWorkspaceLink.toString(),
      dto.FacebookLink.toString(),
      aboutUsImage,
      dto.schoolPhoneNumber.toString(),
      dto.TwitterLink.toString(),
      dto.LinkedInLink.toString(),
      dto.githubLink.toString(),
      dto.innovationText.toString(),
      innovationMainImg,
      newsLetterCardImg,
      newsLetterLargeImag,
      dto.yearsOfFoundation,
      dto.studentsNumber,
    );
    Object.assign(availableContent[0], dto);
    return this.webContentRepository.save(availableContent[0]);
  }
}

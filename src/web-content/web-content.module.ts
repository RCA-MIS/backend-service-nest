import { Module } from '@nestjs/common';
import { WebContentService } from './web-content.service';
import { WebContentController } from './web-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebContent } from 'src/entities/webcontent.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [WebContentService],
  controllers: [WebContentController],
  imports: [TypeOrmModule.forFeature([WebContent]), FilesModule],
})
export class WebContentModule {}

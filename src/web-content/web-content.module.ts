import { Module } from '@nestjs/common';
import { WebContentService } from './web-content.service';
import { WebContentController } from './web-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebContent } from 'src/entities/webcontent.entity';

@Module({
  providers: [WebContentService],
  controllers: [WebContentController],
  imports: [TypeOrmModule.forFeature([WebContent])],
})
export class WebContentModule {}

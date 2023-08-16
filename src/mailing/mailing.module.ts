import { Global, Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
    providers: [
     MailingService,
     ConfigService,
    ],
  exports:[MailingService]
})
export class MailingModule {}

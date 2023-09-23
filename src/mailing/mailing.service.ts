import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { Options } from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';
import { async } from 'rxjs';
import { link } from 'fs';

@Injectable()
export class MailingService {
  private transporter;
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(to: string, name: string, link: string, reset: boolean) {}
  async sendNotificationEmail(
    to: string,
    name: string,
    message: string,
    link: string,
  ) {}
}

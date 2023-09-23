import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateReportCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  studentId: UUID;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  termId: string;
}

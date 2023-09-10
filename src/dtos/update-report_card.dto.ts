import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateReportCardDto {

    @IsString()
    @IsOptional()
    @ApiProperty()
    studentId : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    termId : string;
}
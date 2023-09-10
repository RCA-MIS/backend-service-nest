import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReportCardDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    studentId : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    termId : string;
}
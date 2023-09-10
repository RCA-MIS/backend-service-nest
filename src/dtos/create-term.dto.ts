import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTermDto{
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    endDate: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    academic_year_id: string;
}
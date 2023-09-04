import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAcademicYearDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    startYear: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    endYear: number;
}
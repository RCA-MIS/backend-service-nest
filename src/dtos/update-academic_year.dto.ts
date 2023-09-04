import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAcademicYearDto{
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    startYear: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    endYear: number;
}
import { IsOptional , IsString  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTermDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    startDate: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    endDate: string;
}
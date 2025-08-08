import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray} from "class-validator";
import { ProjectEnum } from "src/models/project.model";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(ProjectEnum)
    @IsOptional()
    category?: ProjectEnum;

    @IsNumber()
    @IsOptional()
    projectedSpend?: number;

    @IsNumber()
    @IsOptional()
    projectedVariance?: number;

    @IsDate()
    @IsOptional()
    projectedStartedAt?: Date;

    @IsDate()
    @IsOptional()
    projectedEndedAt?: Date;

    @IsArray()
    @IsOptional()
    usersId?: number[];
}
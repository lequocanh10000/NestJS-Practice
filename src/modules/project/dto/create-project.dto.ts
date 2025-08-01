import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { IsAfter } from "sequelize-typescript";
import { ProjectEnum } from "src/models/project.model";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
   
    name: string;

    @IsOptional()
    @IsEnum(ProjectEnum, {message: "Must be in the enum"})
    category?: ProjectEnum;

    @IsOptional()
    @IsNumber()
    projectedSpend?: number;

    @IsOptional()
    @IsNumber()
    projectedVariance?: number;

    @IsOptional()
    @IsDate()
    // @IsAfter(new Date().toISOString())
    projectedStartedAt?: Date;

    @IsOptional()
    @IsDate()
    // @IsAfter(started => started.getStartProjectDate())
    projectedEndedAt?: Date;
}
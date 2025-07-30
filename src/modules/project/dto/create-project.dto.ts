import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";
import { IsAfter } from "sequelize-typescript";
import { ProjectEnum } from "src/models/project.model";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    // @Length(8, 10, {message: "Have from 8-10 chars"})
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, { message: 'At least an upper, a lower and a digit',})
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
    projectedStartedAt?: Date;

    @IsOptional()
    @IsDate()
    projectedEndedAt?: Date;
}
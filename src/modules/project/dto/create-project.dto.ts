// Create project dto file


import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ProjectEnum } from "src/models/project.model";

export class CreateProjectDto {
    name: string;
    category?: ProjectEnum;
    projectedSpend?: number;
    projectedVariance?: number;
    projectedStartedAt?: Date;
    projectedEndedAt?: Date;
}
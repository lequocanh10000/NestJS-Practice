import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/models';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project) private readonly projectModel: typeof Project 
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        return await this.projectModel.create(createProjectDto as any);
    }
}

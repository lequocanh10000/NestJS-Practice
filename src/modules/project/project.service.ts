// Logic for projects

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/models';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project) private readonly projectModel: typeof Project 
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        await this.projectModel.create(createProjectDto as any);
        return {
            message: 'Project created successfully',
            data: createProjectDto
        }
    }

    async findAll() {
         return await this.projectModel.findAll({
            order: [['name', 'ASC']],
         });
    }
    
    async findById(id: number) {
        return await this.projectModel.findByPk(id);
    }

    async update(updateProjectDto: UpdateProjectDto, id: number) {
        const existed = await this.projectModel.findByPk(id);
        if(!existed) {
            throw new Error('Project not found');
        }
        const updatedProject = await existed.update(updateProjectDto);
        return {
            message: 'Project updated successfully',
            data: updatedProject
        }
    }

    async delete(id: number) {
        await this.projectModel.destroy({
            where: { id}
        })
        return {
            message: 'Project deleted successfully'
        }
    }
}

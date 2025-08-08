// Logic for projects

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project, ProjectUser, User } from 'src/models';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project) private readonly projectModel: typeof Project ,
        @InjectModel(ProjectUser) private readonly projectUserModel: typeof ProjectUser
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        const {usersId = [], ...projectInfo } = createProjectDto;
        const project = await this.projectModel.create(projectInfo as any);
        
        if(usersId.length) {
            const users = usersId.map((userId: number) => ({
                userId,
                projectId: project.id,
            }));

            await this.projectUserModel.bulkCreate(users as any);
        }
    }
    async findAll() {
         return await this.projectModel.findAll({
            include: [
                {
                    model: ProjectUser,
                    include: [User],
                }
            ],
            order: [['name', 'ASC']],
         });
    }
    
    async findById(id: number) {
        return await this.projectModel.findOne({
            where: {id },
            include: [
                {
                    model: ProjectUser,
                    include: [User],
                }
            ],
        });
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

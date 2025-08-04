// Route for project

import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';


@Controller('api/app/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Get('all')
  async getAllProjects() {
    return await this.projectService.findAll();
  }

  @Get('one/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.findById(id);
  }

  @Patch('update/:id')
  async updateProject(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.update(updateProjectDto, id);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.delete(id);
  }
}

import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
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

  @Put('update/:id')
  async updateProject(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: CreateProjectDto) {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.delete(id);
  }
}

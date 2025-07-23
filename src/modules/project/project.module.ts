import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from 'src/models';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [SequelizeModule.forFeature([Project])]
})
export class ProjectModule {}

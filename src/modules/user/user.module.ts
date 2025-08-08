import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project, ProjectUser, User } from 'src/models';
import { JwtStrategy } from 'src/strategies/jwt.startegy';
import { JwtGuard } from 'src/guards/jwt.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtGuard],
  imports: [SequelizeModule.forFeature([User, ProjectUser, Project])],
  exports: [UserService],
})
export class UserModule {}

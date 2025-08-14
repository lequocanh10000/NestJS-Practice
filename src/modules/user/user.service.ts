import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project, ProjectUser, User } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express';
import { parse } from 'papaparse';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly jwtService: JwtService,
    ) {}

    async findByEmail(email: string) {
        return this.userModel.findOne(
            {
                where: { email},
                raw: true
            }
        )
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);

        if(user) {
            throw new Error('User has been registered');
        }

        const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
        const payload = {
            ...createUserDto,
            password: hashedPassword
        }

        await this.userModel.create(payload as any);

        return { 
            message: 'Registered successfully',
        };
    }

    async login(email: string, password) {
        const user = await this.findByEmail(email)
        if(!user) {
            throw new Error('User has not been registered');
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if(!isCorrectPassword){
            throw new Error('Wrong password.');
        }

        // const { password: _, ...rest} = user;
        const accessToken = await this.jwtService.signAsync({email, password});

        return {
            message: 'LOGGEN IN',
            data: accessToken
        }
    }

    async findUserProjects(id: number) {
        const user =  await this.userModel.findOne({
            where: { id},
            include: [
                {
                    model: ProjectUser,
                    include: [{
                        model: Project,
                        attributes: {
                             exclude: ['createdAt', 'updatedAt'],
                        }
                    }],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'userId', 'projectId']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
          }
        });

        if(!user) {
            throw new Error("User is unknown")
        } else {
            const projects = user.projectUsers?.map((projectUser) => projectUser.project as any);
            return {
                user: user,
                projects: projects
            }
        }
    }
    
    async exportUserProjects(userId: number, res: Response) {
    const user = await this.userModel.findByPk(userId, {
      include: [
        {
          model: ProjectUser,
          include: [Project],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'projectId']
          }
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const projects = user.projectUsers?.map(pu => pu.project) || [];

    const csvData = projects.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      startDate: p.projectedStartedAt ? p.projectedStartedAt.toISOString().split('T')[0] : '',
      endDate: p.projectedEndedAt ? p.projectedEndedAt.toISOString().split('T')[0] : '',
    }));

    const csv = csvDataToString(csvData)


    res.header('Content-Type', 'text/csv');
    res.attachment(`user_${userId}_projects.csv`);
    res.send(csvDataToString(csvData)); 
  }
}



function csvDataToString(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(h => obj[h]).join(','));
  return [headers.join(','), ...rows].join('\n');
}
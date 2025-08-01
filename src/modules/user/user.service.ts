import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User
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

        const { password: _, ...rest} = user;

        return {
            message: 'LOGGEN IN',
            data: rest
        }
    }

    async findUserProjects(id: number) {
        return await this.userModel.findOne({
            where: { id},
            include: ['projectUsers']
        });
    }
}

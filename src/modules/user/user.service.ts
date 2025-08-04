import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User
    ) {}

    
    // Write logic findProject
    async findUserProjects(id: number) {
        return await this.userModel.findOne({
            where: { id},
            include: ['projectUsers']
        });
    }
}

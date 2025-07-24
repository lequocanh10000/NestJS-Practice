import { ConfigService } from "@nestjs/config"
import { SequelizeModuleOptions } from "@nestjs/sequelize"
import { Dialect } from "sequelize"
import { Project, ProjectUser, User } from "src/models"


export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT') || 3306,
    dialect: configService.get<Dialect>('DB_DIALET') || 'mysql',
    synchronize: true,
    autoLoadModels: true,
    logging: false,
    models: [
        User,
        Project,
        ProjectUser
    ]
})
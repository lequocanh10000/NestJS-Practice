import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { sequelizeConfig } from "./config/sequelize.config";
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): SequelizeModuleOptions =>
               sequelizeConfig(configService) 
        }),
        ProjectModule,
        UserModule,
    ],
})
export class AppModule {}
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { sequelizeConfig } from "./config/sequelize.config";
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from "@nestjs/jwt";

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
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN')
                }
            }),
            global: true,
        })
    ],
})
export class AppModule {}
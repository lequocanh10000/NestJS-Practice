import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { sequelizeConfig } from "./config/sequelize.config";
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { LogMiddleware} from "./middlewares/log.middleware";
import { StartTimingMiddleware } from "./middlewares/start-timing.middleware";

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
        }),
    ],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LogMiddleware, StartTimingMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
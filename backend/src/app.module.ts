
import { ClassesModule } from "./Classes/classes.module";
import { ConfigModule } from "./Config/config.module";
import { MiddlewareModule } from "./Middlewares/middleware.module";
import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';

// MODULOS DE RUTAS
import {
  UsersModule,
  AuthModule

} from "./Modules/Routes.module.index";

// MODULOS DE LOADING Y OTROS

// modulos de config
import { ConfigService } from "./Config/index";
import { Configuration } from "./Config/config.keys";
import { _MONGOOSEMODULE } from "./Database/mongo-config";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClassesModule,
    _MONGOOSEMODULE,
    ConfigModule,
    AuthModule,
    MiddlewareModule,
    UsersModule

  ],
  controllers: [],
  providers: [ ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) 
  {

    AppModule.port = this._configService.get(Configuration.PORT);
  }
}

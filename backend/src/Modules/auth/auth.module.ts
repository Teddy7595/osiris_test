import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '../../config/config.module';

// import { Configuration } from '../../Config/config.keys';
// import { ConfigService } from '../../Config';


import { UsersService } from '../users/services/users.service';
import {ConfigModule} from 'src/Config/config.module';
import {ConfigService} from 'src/Config';
import {Configuration} from 'src/Config/config.keys';
import { AuthService } from './services/authServices.index';



@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // ModelsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: '48h',
          },
        };
      },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [JwtStrategy, PassportModule],

  // providers: [AuthService, JwtStrategy, SetUserMenuService, RoleService, UsersService, ServicesModule],
  // exports: [JwtStrategy, PassportModule, SetUserMenuService],
})

export class AuthModule {}




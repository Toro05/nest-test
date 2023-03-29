import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';

import { SetMetadata } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
    imports: [UsersModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10s' },
      }),
  ],
    controllers: [AuthController],
    providers: [{
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
})
export class AuthModule {}

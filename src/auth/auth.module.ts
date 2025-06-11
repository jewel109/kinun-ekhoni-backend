import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secrets } from 'src/user/constants';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PolicyService } from './policy.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]),
    PassportModule
    ,
    JwtModule.register({
      secret: secrets.secret.toString(),
      signOptions: { expiresIn: '10d' }
    })
  ],
  providers: [AuthService, JwtStrategy, PolicyService],
  controllers: [AuthController],
  exports: [AuthService, PolicyService]
})
export class AuthModule { }



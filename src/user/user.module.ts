import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { secrets } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: secrets.secret.toString(),
    signOptions: { expiresIn: '10d' }
  }),
  forwardRef(() => AuthModule)

  ],
  providers: [UserService,],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }

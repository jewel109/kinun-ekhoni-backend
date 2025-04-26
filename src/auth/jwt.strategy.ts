
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { secrets } from 'src/user/constants';
import { AuthCredintialDto } from './authcredintialDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secrets.secret.toString(),
    });
  }

  async validate(payload: AuthCredintialDto) {
    // console.log(payload)
    return { email: payload.email, password: payload.password };
  }
}


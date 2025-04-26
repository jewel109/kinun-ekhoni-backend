import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthCredintialDto } from './authcredintialDto';
import { validatePassword } from './misc';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: AuthCredintialDto): Promise<{ accessToken: string }> {


    const user = await this.usersRepository.findOne({ where: { email: signInDto.email } })
    if (!user) {
      throw new NotFoundError("User is not found with this email ")
    }
    const matchedPass = await validatePassword(signInDto.password, user.password)

    if (!matchedPass) {
      throw new NotFoundError("Password is not mathced")
    }

    return { accessToken: this.jwtService.sign(signInDto) }
  }



}

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new NotFoundException("User is not found with this email ")
    }
    const matchedPass = validatePassword(signInDto.password, user.password)

    if (!matchedPass) {
      throw new NotFoundException("Password is not mathced")
    }

    return { accessToken: this.jwtService.sign(signInDto) }
  }



}

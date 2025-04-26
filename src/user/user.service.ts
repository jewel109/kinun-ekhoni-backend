import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredintialDto } from 'src/auth/authcredintialDto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async createUser({ email, password }: AuthCredintialDto): Promise<{ accessToken: string }> {
    if (await this.usersRepository.findOne({ where: { email } })) {
      throw new ConflictException("User already present in DB")
    }
    const hashedPassword = await bcrypt.hash(password, 15)

    const newUser = this.usersRepository.create({ email, password: hashedPassword })

    this.usersRepository.save(newUser)

    const payload = { email, password }

    return { accessToken: this.jwtService.sign(payload) }
  }

}

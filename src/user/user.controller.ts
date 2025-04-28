import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IResponse } from 'src/success.interceptor';
import { AuthCredintialDto } from 'src/auth/authcredintialDto';
import { Public } from 'src/utils/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Get('users')
  // async getUsers(): Promise<IResponse<User[]>> {
  //   const users = await this.userService.findAll();
  //   // console.log(users)
  //   if (users.length === 0) {
  //     throw new NotFoundException('No user found');
  //   }
  //   return { data: users };
  // }
  //
  @Post('addUser')
  async createUser(
    @Body() createUserDto: AuthCredintialDto,
  ): Promise<IResponse<string>> {
    const { accessToken } = await this.userService.createUser(createUserDto);

    return { data: accessToken };
  }

  @Public()
  @Get('users')
  async getUsers(): Promise<IResponse<string>> {
    return { data: "found users" }
  }

  // @Post('findUser')
  // async findUser(
  //   @Body() { name, email, password }: CreateUserDto
  // ): Promise<IResponse<User>> {
  //   const data = await this.userService.findOne({ name, email, password })
  //   if (!data) {
  //     throw new NotFoundException("User is not found")
  //   }
  //   return { data: data }
  // }
}

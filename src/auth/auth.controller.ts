import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { IResponse } from 'src/success.interceptor';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthCredintialDto } from './authcredintialDto';
import { Public } from 'src/utils/public.decorator';
import { Policy } from './policy.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService

  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signInDto: AuthCredintialDto
  ): Promise<IResponse<string>> {

    const { accessToken } = await this.authService.signIn(signInDto)

    return { data: accessToken }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signUp(
    @Body() { email, password, role }: AuthCredintialDto): Promise<IResponse<string>> {
    const { accessToken } = await this.userService.createUser({ email, password, role })
    return { data: accessToken }
  }

  @Get('profile')
  @Policy('product', 'create')
  getUserData(@Request() req): IResponse<AuthCredintialDto> {

    console.log(req.user.email)
    const data = req.user.email
    return { data: { email: req.user.email, password: req.user.password, role: req.user.role } }
  }

}

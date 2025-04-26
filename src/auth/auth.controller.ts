import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { IResponse } from 'src/success.interceptor';
import { UserService } from 'src/user/user.service';
import { AuthCredintialDto } from './authcredintialDto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.gurd';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService

  ) { }
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signInDto: AuthCredintialDto
  ): Promise<IResponse<string>> {

    const { accessToken } = await this.authService.signIn(signInDto)

    return { data: accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signUp(
    @Body() { email, password }: AuthCredintialDto): Promise<IResponse<string>> {
    const { accessToken } = await this.userService.createUser({ email, password })
    return { data: accessToken }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserData(@Request() req): IResponse<AuthCredintialDto> {

    console.log(req.user.email)
    const data = req.user.email
    return { data: { email: req.user.email, password: req.user.password } }
  }

}

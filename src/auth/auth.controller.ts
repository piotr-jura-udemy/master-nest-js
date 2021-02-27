import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() request) {
    return {
      userId: request.user.id,
      token: 'the token will go here'
    }
  }
}
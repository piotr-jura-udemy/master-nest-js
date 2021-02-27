import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() request) {
    console.log(process.env.AUTH_SECRET);
    return {
      userId: request.user.id,
      token: this.authService.getTokenForUser(request.user)
    }
  }
}
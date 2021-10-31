import { RolesGuard } from './roles/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Roles } from './roles/roles.decorator';
import { UserRole } from './users/entities/user.entity';
import { Public } from './public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private AuthService: AuthService,
  ) {}

  /** With @UseGuards(AuthGuard('local')) we are using an AuthGuard that
   * @nestjs/passport automatically provisioned for us when we extended
   * the passport-local strategy. */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.AuthService.login(req.user);
  }

  @Roles(UserRole.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }

  // @Public()
  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const res = await this.AuthService.register(createUserDto);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

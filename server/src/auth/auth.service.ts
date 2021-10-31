import { User } from './../users/entities/user.entity';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, givenPassword: string): Promise<any> {
    const user = await this.usersService.findOneUsingEmail(email);
    if (!user) throw new NotFoundException('Email not registered!');
    const { password, ...result } = user;

    console.log(email, givenPassword);
    const isMatch = await bcrypt.compare(givenPassword, password);
    if (isMatch) {
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.signJwt(user),
    };
  }

  async register(user: CreateUserDto) {
    const saltOrRounds = 10;
    const { password, ...rest } = user;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const storedUser = await this.usersService.create({
      ...rest,
      password: hash,
    });
    return {
      access_token: this.signJwt(storedUser),
    };
  }

  private signJwt(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id, roles: [user.role] };
    return this.jwtService.sign(payload);
  }
}

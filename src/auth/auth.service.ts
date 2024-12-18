import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async binding(body) {
    const res = await this.userService.binding(body);
    const payload = { username: res.device_id, sub: res.id };
    const access_token = await this.jwtService.signAsync(payload);
    return Object.assign(res, { access_token });
  }
  async login(body) {
    const res = await this.userService.login(body);
    const payload = { username: res.device_id, sub: res.id };
    const access_token = await this.jwtService.signAsync(payload);
    return Object.assign(res, { access_token });
  }
}

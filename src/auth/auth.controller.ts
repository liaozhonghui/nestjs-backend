import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPublic } from './auth.decorator';
import { createResponse } from 'src/common/utils/response.util';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @AuthPublic()
  @Post('binding')
  @HttpCode(HttpStatus.OK)
  async binding(@Body() body: Record<string, any>) {
    const appKey = this.configService.get<string>('appKey');
    console.log('appKey:', appKey);
    console.log('222');
    const res = await this.authService.binding(body);

    return createResponse(res); // 使用统一格式返回
  }

  @AuthPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: Record<string, any>) {
    const res = await this.authService.login(body);
    return createResponse(res);
  }
}

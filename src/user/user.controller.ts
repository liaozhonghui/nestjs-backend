import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { createResponse } from 'src/common/utils/response.util';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Post('/api/getUserInfo')
  async getUserInfo(@Request() req) {
    const { id } = req['user'];
    const res = await this.userService.getUserInfo(id);
    return createResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/api/getGuideInfo')
  async getGuideInfo() {
    return createResponse({});
  }

  @HttpCode(HttpStatus.OK)
  @Post('/api/setGuideInfo')
  async setGuideInfo(@Body() body: Record<string, any>) {
    return createResponse({ body });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/api/getPlanDetailInfo')
  async getPlanDetailInfo() {
    return createResponse({});
  }

  @HttpCode(HttpStatus.OK)
  @Post('/api/setPlanDetailInfo')
  async setPlanDetailInfo(@Body() body: Record<string, any>) {
    return createResponse({ body });
  }
}

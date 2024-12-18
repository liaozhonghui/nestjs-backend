import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    public code: number,
    public errmsg: string,
  ) {
    super(errmsg, HttpStatus.OK);
  }
  getStatus(): number {
    return this.code;
  }
}

export enum ERROR_CODE {
  DEFLAULT = 200, // 默认

  USER_NOT_GENERATE = 601, // 用户未生成
  USER_HAS_BIND = 602, // 用户已绑定
  UNKNOWN = 999, // 未知错误
}

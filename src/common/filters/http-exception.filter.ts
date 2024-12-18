import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ResponseDto } from '../dto/response.dto'; // 引入统一响应格式

@Catch(Error, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();
    const message = exception.message || '服务器内部错误';
    console.log('拦截到异常了.', exception.message);
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      // 返回统一格式的错误信息
      reply.status(HttpStatus.OK).send(new ResponseDto(status, message, {}));
    } else {
      reply
        .status(HttpStatus.OK)
        .send(new ResponseDto(500, `服务器未捕捉异常: ${message}`, {}));
    }
  }
}

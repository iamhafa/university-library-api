import { RESPONSE_RESULT, STATUS_CODE } from '@/common/constants';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const errorMessage: string = exception.message;

    // Format custom response
    const errorResponse = {
      result: RESPONSE_RESULT.NG,
      errorMessage,
    };

    // Send custom response
    return response.status(STATUS_CODE.NG).json(errorResponse);
  }
}

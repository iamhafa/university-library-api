import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RESPONSE_RESULT, STATUS_CODE } from '@/common/constants';

// catch all http exceptions (ex: BadRequest....)
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const error: string = exception.message;
    const errorMessage = exception.getResponse();

    // Format custom response
    const errorResponse: Record<string, string | string[]> = {
      result: RESPONSE_RESULT.NG,
      error,
      errorMessage: errorMessage['message'],
    };

    // Send custom response
    return response.status(STATUS_CODE.NG).json(errorResponse);
  }
}

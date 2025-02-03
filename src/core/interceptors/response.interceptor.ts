import { format } from 'date-fns';
import { map, Observable } from 'rxjs';
import { isNull, isObject } from 'lodash';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { RESPONSE_RESULT } from '@/common/constants/enum';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        return {
          results: RESPONSE_RESULT.OK,
          dataPart: this.formatDates(data), // format date if existed
        };
      }),
    );
  }

  private formatDates(response: unknown): any {
    if (Array.isArray(response)) {
      // continue format date
      return response.map((item) => this.formatDates(item));
    } else if (!isNull(response) && isObject(response)) {
      Object.keys(response).forEach((key: string) => {
        // nếu property nào của 1 object thuộc kiểu Date
        if (response[key] instanceof Date) {
          response[key] = format(response[key], 'dd-MM-yyyy HH:mm'); // Desired format
          // nếu property vẫn là object thì tiếp tục run format
        } else if (isObject(response[key])) {
          response[key] = this.formatDates(response[key]);
        }
      });
    }
    return response;
  }
}

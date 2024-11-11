import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { format } from 'date-fns';

@Injectable()
export class FormatDateResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        return this.formatDates(data);
      }),
    );
  }

  private formatDates(response: unknown): any {
    if (Array.isArray(response)) {
      // continue format date
      return response.map((item) => this.formatDates(item));
    } else if (response !== null && typeof response === 'object') {
      Object.keys(response).forEach((key: string) => {
        if (response[key] instanceof Date) {
          response[key] = format(response[key], 'dd-MM-yyyy HH:mm'); // Desired format
        } else if (typeof response[key] === 'object') {
          response[key] = this.formatDates(response[key]);
        }
      });
    }
    return response;
  }
}

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

  private formatDates(data: unknown): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.formatDates(item));
    } else if (data !== null && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof Date) {
          data[key] = format(data[key], 'dd-MM-yyyy HH:mm'); // Desired format
        } else if (typeof data[key] === 'object') {
          data[key] = this.formatDates(data[key]);
        }
      });
    }
    return data;
  }
}

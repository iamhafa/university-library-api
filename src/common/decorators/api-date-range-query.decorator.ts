import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiDateRangeQuery(): MethodDecorator {
  return applyDecorators(
    ApiQuery({
      name: 'start_date',
      required: false,
      type: String,
      example: '2024-01-01',
      description: 'Ngày bắt đầu theo định dạng ISO (YYYY-MM-DD)',
    }),
    ApiQuery({
      name: 'end_date',
      required: false,
      type: String,
      example: '2024-01-31',
      description: 'Ngày kết thúc theo định dạng ISO (YYYY-MM-DD)',
    }),
  );
}

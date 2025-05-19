import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiPaginationQuery(): MethodDecorator {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      default: 1,
      type: Number,
      description: 'Trang hiện tại cần lấy (mặc định là trang 1)',
    }),
    ApiQuery({
      name: 'limit',
      default: 10,
      type: Number,
      description: 'Số lượng bản ghi tối đa trả về trong 1 trang (mặc định 10)',
    }),
  );
}

import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiPaginationQuery(): MethodDecorator {
  return applyDecorators(
    ApiQuery({ name: 'limit', default: 10, description: 'Số lượng bản ghi tối đa trả về trong 1 trang (mặc định 10)' }),
    ApiQuery({ name: 'page', default: 1, description: 'Trang hiện tại cần lấy (mặc định là trang 1)' }),
  );
}

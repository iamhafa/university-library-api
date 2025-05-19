import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const StartDateQuery = createParamDecorator((data: unknown, ctx: ExecutionContext): string | null => {
  const request = ctx.switchToHttp().getRequest();
  const value = request.query.start_date;

  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new BadRequestException(`Invalid start_date: ${value}`);
  }

  return value;
});

export const EndDateQuery = createParamDecorator((data: unknown, ctx: ExecutionContext): string | null => {
  const request = ctx.switchToHttp().getRequest();
  const value = request.query.end_date;

  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new BadRequestException(`Invalid end_date: ${value}`);
  }

  return value;
});

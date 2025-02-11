import { IsOptional } from 'class-validator';

export abstract class BaseDto<T = any> {
  constructor(dto: Partial<T>) {
    Object.assign(this, dto);
  }

  @IsOptional() // due to auto generated
  id?: number;

  @IsOptional() // due to auto generated
  created_at?: Date;

  @IsOptional() // due to auto generated
  updated_at?: Date;

  @IsOptional() // due to auto generated
  deleted_at?: Date;
}

export abstract class BaseDto<T = any> {
  constructor(dto: Partial<T>) {
    Object.assign(this, dto);
  }

  id: number;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;
}

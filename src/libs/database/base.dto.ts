export abstract class BaseDto<T = any> {
  constructor(dto: Partial<T>) {
    Object.assign(this, dto);
  }

  id: number;

  createdAt: Date;

  updatedAt: Date;
}

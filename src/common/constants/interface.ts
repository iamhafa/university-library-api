import { PaginationDto } from '@/libs/database/dto/pagination.dto';
import { FindOptionsOrder, FindOptionsRelations } from 'typeorm';
import { TPagination } from './type';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IFindOneByIdOptions<T> {
  relations?: FindOptionsRelations<T>;
}

export interface IFindAllOptions<T> {
  paginationDto: PaginationDto;
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
}

export interface IBaseRepository<T> {
  createOne(data: T): Promise<T>;
  findOneById(id: number, options?: IFindOneByIdOptions<T>): Promise<T>;
  findAll(options: IFindAllOptions<T>): Promise<TPagination<T[]>>;
  updateOneById(id: number, partialEntity: QueryDeepPartialEntity<T>): Promise<T>;
  deleteOneById(id: number): Promise<T>;
}

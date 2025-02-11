import { DeleteResult, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';
import { PaginationDto } from './pagination.dto';
import { TPagination } from '@/common/constants/type';

// Repository layer (define all methods about CRUD for all modules)
export abstract class BaseRepository<T extends BaseEntity<T>> {
  protected readonly logger = new Logger(BaseRepository.name);

  constructor(private readonly entityRepository: Repository<T>) {}

  /**
   * Create new entity based on value
   * @param entity - values for new entity
   * @returns new entity
   */
  createOne(entity: T): Promise<T> {
    this.logger.verbose(`Create entity ${JSON.stringify(entity)} for`, this.entityRepository.target);
    return this.entityRepository.save(entity);
  }

  /**
   * Find all records
   * @returns all records of this entity
   */
  async findAll(paginationDto?: PaginationDto): Promise<TPagination<T> | T[]> {
    this.logger.log('Find all internal entities for', this.entityRepository.target);

    if (paginationDto) {
      const { limit, page } = paginationDto;
      const [entities, total] = await this.entityRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        data: entities,
        page,
        limit,
        total,
      };
    } else {
      return this.entityRepository.find();
    }
  }

  /**
   * Find 1 entity with `where` conditions
   * @param where - must be pass { id } params
   */
  async findOneById(where: FindOptionsWhere<T>): Promise<T> {
    const entity: T = await this.entityRepository.findOneBy(where);

    if (!entity) {
      this.logger.error(`Entity not found with where: ${JSON.stringify(where)}`, this.entityRepository.target);
      throw new NotFoundException(`Entity not found for where: ${JSON.stringify(where)}`);
    } else {
      this.logger.debug(`Find one entity with where: ${JSON.stringify(where)}`, this.entityRepository.target);
      return entity;
    }
  }

  async findOneByFilter(where: FindOptionsWhere<T>) {
    return this.entityRepository.findOneBy(where);
  }

  /**
   * Update entity based on `id`
   * @param where - must be pass { id } params
   * @param partialEntity - new value for this entity
   */
  async findOneByIdAndUpdate(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    const updateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) {
      this.logger.warn(`Entity not found with where: ${JSON.stringify(where)}`, this.entityRepository.target);
      throw new NotFoundException('Entity not found');
    } else {
      return this.findOneById(where);
    }
  }

  /**
   * include thêm với các bảng có quan hệ
   * @example Author ==> AuthorBookItems <== Book
   * @param relations { author: true, book: true }
   * @param where
   * @returns tất cả items cùng với relations tương ứng
   */
  findAllWithRelations(relations: FindOptionsRelations<T>, where?: FindOptionsWhere<T>): Promise<T[]> {
    this.logger.log(`Find all external with relations ${JSON.stringify(relations)}`, this.entityRepository.target);
    return this.entityRepository.find({ relations, where });
  }

  /**
   * Find all records matched with given conditions
   * @param where - filter conditions
   * @returns the data matched conditions
   */
  findAllWithFilter(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  /**
   * Delete entity based on `id` (fill timestamp into `deleted_at` column)
   * @param where - must be pass { id } params
   * @returns
   */
  async findOneAndDelete(where: FindOptionsWhere<T>) {
    const deleteResult: DeleteResult = await this.entityRepository.delete(where);

    if (deleteResult.affected === 1) {
      this.logger.warn(`Deleted ${JSON.stringify(where)}`, this.entityRepository.target);
      return deleteResult;
    } else {
      this.logger.log(`Can't delete ${JSON.stringify(where)}`, this.entityRepository.target);
    }
  }
}

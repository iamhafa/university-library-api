import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';
import { PaginationDto } from './pagination.dto';
import { TPagination } from '@/common/constants/type';

// Repository layer (define all methods about CRUD for all modules)
export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly entityRepository: Repository<T>) {}

  private readonly logger = new Logger(BaseRepository.name);
  private readonly tableName: string = this.entityRepository.metadata.tableName.toUpperCase();

  private stringify(value: object | any[]): string {
    return JSON.stringify(value);
  }

  /**
   * Create new entity based on value
   * @param entity - values for new entity
   * @returns new entity
   */
  async createOne(entity: T): Promise<T> {
    const saved: T = await this.entityRepository.save(entity);
    this.logger.log(`Create ${this.tableName} successfully: ${this.stringify(entity)}`);
    return saved;
  }

  /**
   * Find all records
   * @returns all records of this entity
   */
  async findAll(paginationDto: PaginationDto): Promise<TPagination<T[]>> {
    const { limit, page } = paginationDto;
    const [entities, total] = await this.entityRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    this.logger.log(`Find all ${this.tableName}`);

    return {
      data: entities,
      current_page: page,
      limit,
      total_items: total,
      total_pages: Math.ceil(total / limit),
    };
  }

  /**
   * Find 1 entity with `where` conditions
   * @param where - must be pass { id } params
   */
  async findOneBy(where: FindOptionsWhere<T>): Promise<T> {
    const entity: T = await this.entityRepository.findOneBy(where);

    if (entity instanceof BaseEntity) {
      this.logger.log(`Find one ${this.tableName} with where: ${this.stringify(where)}`);
      return entity;
    } else {
      this.logger.error(`Not found for ${this.tableName} with where: ${this.stringify(where)}`);
      throw new NotFoundException(`Not found for ${this.tableName} where: ${this.stringify(where)}`);
    }
  }

  /**
   * Update entity based on `id`
   * @param where - must be pass { id } params
   * @param partialEntity - new value for this entity
   */
  async updateOne(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.findOneBy(where);

    const updateResult: UpdateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) throw new ConflictException(`Failed to update table ${this.tableName}.`);
    else return this.findOneBy(where);
  }

  /**
   * Delete entity based on `id` (fill timestamp into `deleted_at` column)
   * @param where - must be pass { id } params
   * @returns
   */
  async deleteOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity: T = await this.findOneBy(where);
    const deleted: T = await this.entityRepository.softRemove(entity);

    if (deleted instanceof BaseEntity) {
      this.logger.warn(`Deleted ${this.tableName} with ID ${where.id}`);
      return deleted;
    }
  }
}

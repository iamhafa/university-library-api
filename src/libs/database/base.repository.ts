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

  /**
   * Create a new entity in the database.
   * @param entity - Data to create the new entity.
   * @returns The newly created entity.
   */
  async createOne(entity: T): Promise<T> {
    const saved: T = await this.entityRepository.save(entity);
    this.logger.log(`[${this.tableName}] Created successfully: ${JSON.stringify(saved)}`);
    return saved;
  }

  /**
   * Retrieve a paginated list of all entities.
   * @param paginationDto - Pagination parameters (page, limit).
   * @returns A paginated result containing entities and pagination metadata.
   */
  async findAll(paginationDto: PaginationDto): Promise<TPagination<T[]>> {
    const { limit, page } = paginationDto;
    const [entities, total] = await this.entityRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    this.logger.log(`[${this.tableName}] Retrieved ${entities.length} records (Page ${page})`);

    return {
      data: entities,
      current_page: page,
      limit,
      total_items: total,
      total_pages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a single entity by specified conditions.
   * @param where - Conditions to find the entity (e.g., { id: 1 }).
   * @returns The found entity.
   * @throws NotFoundException if no entity is found.
   */
  async findOneBy(where: FindOptionsWhere<T>): Promise<T> {
    const entity: T = await this.entityRepository.findOneBy(where);

    if (entity instanceof BaseEntity) {
      this.logger.log(`[${this.tableName}] Found entity with conditions: ${JSON.stringify(where)}`);
      return entity;
    } else {
      this.logger.error(`[${this.tableName}] Entity not found with conditions: ${JSON.stringify(where)}`);
      throw new NotFoundException(`Entity not found for ${this.tableName} with conditions: ${JSON.stringify(where)}`);
    }
  }

  /**
   * Update an existing entity based on specified conditions.
   * @param where - Conditions to find the entity to update (e.g., { id: 1 }).
   * @param partialEntity - Data to update the entity with.
   * @returns The updated entity.
   * @throws ConflictException if the update fails.
   */
  async updateOneBy(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.findOneBy(where);

    const updateResult: UpdateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) {
      this.logger.error(`[${this.tableName}] Failed to update entity with conditions: ${JSON.stringify(where)}`);
      throw new ConflictException(`Failed to update ${this.tableName}.`);
    }

    this.logger.log(`[${this.tableName}] Updated entity successfully with conditions: ${JSON.stringify(where)}`);
    return this.findOneBy(where);
  }

  /**
   * Soft delete an entity by specified conditions (sets the deleted_at field).
   * @param where - Conditions to find the entity to delete (e.g., { id: 1 }).
   * @returns The soft-deleted entity.
   */
  async deleteOneBy(where: FindOptionsWhere<T>): Promise<T> {
    const entity: T = await this.findOneBy(where);
    const deleted: T = await this.entityRepository.softRemove(entity);

    if (deleted instanceof BaseEntity) {
      this.logger.warn(`[${this.tableName}] Soft-deleted entity with conditions: ${JSON.stringify(where)}`);
      return deleted;
    }
  }
}

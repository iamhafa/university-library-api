import { EntityManager, EntityTarget, FindOptionsRelations, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { PaginationDto } from '../dto/pagination.dto';
import { TPagination } from '@/common/constants/type';

// Repository layer (define all methods about CRUD for all modules)
export abstract class BaseRepository<T extends BaseEntity> extends Repository<T> {
  private readonly logger = new Logger(BaseRepository.name);
  private readonly tableName: string = this.metadata.tableName.toUpperCase();

  constructor(
    protected readonly entity: EntityTarget<T>,
    protected readonly entityManager: EntityManager,
  ) {
    super(entity, entityManager);
  }

  public async createOne(data: T): Promise<T> {
    const saved: T = await this.save(data);
    this.logger.log(`[${this.tableName}] Created successfully: ${JSON.stringify(saved)}`);
    return saved;
  }

  public async findOneById(id: number, relations?: FindOptionsRelations<T>): Promise<T> {
    const entity: T = await this.findOne({ where: { id } as FindOptionsWhere<T>, relations });

    if (entity instanceof BaseEntity) {
      this.logger.log(`[${this.tableName}] Found entity with ID ${id}.`);
      return entity;
    } else {
      this.logger.error(`[${this.tableName}] Entity not found with ID ${id}.`);
      throw new NotFoundException(`Entity not found for ${this.tableName} with ID ${id}.`);
    }
  }

  public async findAll(paginationDto: PaginationDto, relations?: FindOptionsRelations<T>): Promise<TPagination<T[]>> {
    const { limit, page } = paginationDto;
    const [entities, total] = await this.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations,
    });

    this.logger.log(`[${this.tableName}] Retrieved ${entities.length} records (Page ${page})`);

    return {
      data: entities,
      current_page: page,
      limit,
      total_pages: Math.ceil(total / limit),
      total_items: total,
    };
  }

  public async updateOneById(id: number, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.findOneById(id);

    const updateResult: UpdateResult = await this.update(id, partialEntity);

    if (!updateResult.affected) {
      this.logger.error(`[${this.tableName}] Failed to update entity with conditions: ${id}`);
      throw new ConflictException(`Failed to update ${this.tableName}.`);
    }

    this.logger.log(`[${this.tableName}] Updated entity successfully with conditions: ${id}`);
    return this.findOneById(id);
  }

  public async deleteOneById(id: number): Promise<T> {
    const entity: T = await this.findOneById(id);
    const deleted: T = await this.softRemove(entity);

    if (deleted instanceof BaseEntity) {
      this.logger.warn(`[${this.tableName}] Soft-deleted entity with conditions: ${id}`);
      return deleted;
    }
  }
}

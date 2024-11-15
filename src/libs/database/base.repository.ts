import { DeleteResult, FindOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';

// Repository layer (define all methods about CRUD for all modules)
export abstract class BaseRepository<T extends BaseEntity<T>> {
  protected readonly logger: Logger;

  constructor(private readonly entityRepository: Repository<T>) {}

  createOne(entity: T): Promise<T> {
    this.logger.verbose(
      `Create entity for ${JSON.stringify(entity)} at ${JSON.stringify(this.logger.localInstance['context'])}`,
    );
    return this.entityRepository.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn(
        `Entity not found with where ${JSON.stringify(where)} at ${JSON.stringify(this.logger.localInstance['context'])}`,
      );
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async findOneAndUpdate(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    const updateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) {
      this.logger.warn(`Entity not found with where ${JSON.stringify(where)}`);
      throw new NotFoundException('Entity not found');
    }
    return this.findOne(where);
  }

  findAll(): Promise<T[]> {
    this.logger.log('Find all internal entities');
    return this.entityRepository.find();
  }

  /**
   * include thêm với các bảng có quan hệ
   * @example Author ==> AuthorBookItems <== Book
   * @param relations { author: true, book: true }
   * @returns tất cả items cùng với relations tương ứng
   */
  findAllWithRelations(relations: FindOptionsRelations<T>): Promise<T[]> {
    this.logger.log(`Find all external with relations ${JSON.stringify(relations)}`);
    return this.entityRepository.find({ relations });
  }

  findAllWithFilter(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  findOneAndDelete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entityRepository.delete(where);
  }
}

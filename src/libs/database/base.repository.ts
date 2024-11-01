import { DeleteResult, FindOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';

// Repository layer (define all methods about CRUD for all modules)
export abstract class BaseRepository<T extends BaseEntity<T>> {
  constructor(private readonly entityRepository: Repository<T>) {}

  protected readonly logger: Logger;

  createOne(entity: T): Promise<T> {
    return this.entityRepository.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn(`Entity not found with where ${JSON.stringify(where)}`);
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async findOneAndUpdate(where: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>) {
    const updateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found');
    }
    return this.findOne(where);
  }

  findAll(): Promise<T[]> {
    return this.entityRepository.find();
  }

  findAllWithRelations(relations: FindOptions<T>): Promise<T[]> {
    return this.entityRepository.find({});
  }

  findAllWithFilter(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  findOneAndDelete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entityRepository.delete(where);
  }
}

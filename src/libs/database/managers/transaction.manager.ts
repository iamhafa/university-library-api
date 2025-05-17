import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class TransactionManager {
  constructor(private readonly dataSource: DataSource) {}

  private readonly logger = new Logger(TransactionManager.name);

  async execute<T>(entity: EntityTarget<T>, fn: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    const tableName = this.dataSource.getMetadata(entity).tableName.toUpperCase();

    try {
      const result: Awaited<T> = await this.dataSource.transaction(async (entityManager: EntityManager) => {
        const transactionResult: Awaited<T> = await fn(entityManager);

        this.logger.log(`Transaction executed successfully on table ${tableName}: ${JSON.stringify(transactionResult)}`);
        return transactionResult;
      });

      return result;
    } catch (error) {
      this.logger.error(`Transaction failed on table ${tableName}: ${error?.message || JSON.stringify(error)}`);
      throw new InternalServerErrorException('Error during transaction.');
    }
  }
}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFactoryConfig } from '@/config/typeorm-factory.config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TransactionManager } from './managers/transaction.manager';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmFactoryConfig })],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class DatabaseModule {
  static forFeature(entity: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entity);
  }
}

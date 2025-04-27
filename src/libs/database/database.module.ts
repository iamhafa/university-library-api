import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@/config/typeorm.config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig })],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forFeature(entity: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entity);
  }
}

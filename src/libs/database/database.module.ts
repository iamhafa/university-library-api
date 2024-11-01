import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModuleConfig } from '@/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfig })],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forFeature(entity: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entity);
  }
}

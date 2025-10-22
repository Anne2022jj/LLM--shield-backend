import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaVersionsService } from './schema-version.service';
import { SchemaVersionsController } from './schema-version.controller';
import { SchemaVersion } from './entities/schema-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchemaVersion])],
  controllers: [SchemaVersionsController],
  providers: [SchemaVersionsService],
  exports: [SchemaVersionsService],
})
export class SchemaVersionsModule {}

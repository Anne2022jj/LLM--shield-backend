import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MlModelsService } from './ml-moduls.service';
import { MlModulsController } from './ml-moduls.controller';
import { MlModel } from './entities/ml-modul.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MlModel])],
  controllers: [MlModulsController],
  providers: [MlModelsService],
  exports: [MlModelsService],
})
export class MlModelsModule {}

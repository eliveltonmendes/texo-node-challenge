import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { Producer } from '../database/entity/producer.entity';
import { ProducerRepository } from 'src/database/repositories/producer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [ProducerService, ProducerRepository],
  controllers: [ProducerController],
})
export class ProducerModule {}

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../database/entity/movie.entity';
import { Studio } from '../database/entity/studio.entity';
import { MovieStudio } from '../database/entity/movie-studio.entity';
import { MovieProducer } from '../database/entity/movie-producer.entity';
import { Producer } from '../database/entity/producer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      Studio,
      MovieStudio,
      MovieProducer,
      Producer,
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

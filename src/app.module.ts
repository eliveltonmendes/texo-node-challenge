import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database/config/ormconfig';
import { UploadModule } from './upload/upload.module';
import { ProducerModule } from './producer/producer.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UploadModule,
    ProducerModule,
    MovieModule,
  ],
})
export class AppModule {}

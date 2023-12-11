import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../database/entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieRepository } from '../database/repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository]
})

export class MovieModule {}

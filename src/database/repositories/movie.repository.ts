import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Movie } from '../entity/movie.entity';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }

  async getMovies(): Promise<Movie[]> {
    return await this.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.movieProducers', 'movieProducers')
      .innerJoinAndSelect('movieProducers.producer', 'producer')
      .innerJoinAndSelect('movie.movieStudios', 'movieStudios')
      .innerJoinAndSelect('movieStudios.studio', 'studio')
      .orderBy('movie.title', 'ASC')
      .addOrderBy('producer.name', 'ASC')
      .addOrderBy('studio.name', 'ASC')
      .getMany();
  }
}

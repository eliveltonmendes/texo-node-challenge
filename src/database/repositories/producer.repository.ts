import { DataSource, Repository } from 'typeorm';
import { Producer } from '../entity/producer.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducerRepository extends Repository<Producer> {
  constructor(private dataSource: DataSource) {
    super(Producer, dataSource.createEntityManager());
  }

  async getWinnerProducers(): Promise<Producer[]> {
    return this.createQueryBuilder('producer')
      .innerJoinAndSelect('producer.movieProducers', 'movieProducers')
      .innerJoinAndSelect('movieProducers.movie', 'movie')
      .where('movie.winner is true')
      .orderBy('producer.name', 'ASC')
      .addOrderBy('movie.year', 'ASC')
      .getMany();
  }
}

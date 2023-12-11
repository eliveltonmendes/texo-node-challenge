import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieProducer } from './movie-producer.entity';

@Entity({ name: 'producer' })
export class Producer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieProducer, (movieProducer) => movieProducer.producer)
  @JoinColumn({ name: 'id', referencedColumnName: 'movie_producer_id' })
  movieProducers: MovieProducer[];
}

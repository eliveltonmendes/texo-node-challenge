import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Producer } from './producer.entity';

@Entity({ name: 'movie_producer' })
export class MovieProducer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Producer)
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;
}

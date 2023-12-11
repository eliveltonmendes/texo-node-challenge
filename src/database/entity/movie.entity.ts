import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieProducer } from './movie-producer.entity';
import { MovieStudio } from './movie-studio.entity';

@Entity({ name: 'movie' })
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  winner: boolean;

  @OneToMany(() => MovieProducer, (movieProducer) => movieProducer.movie)
  @JoinColumn({ name: 'id', referencedColumnName: 'movie_id' })
  movieProducers: MovieProducer[];

  @OneToMany(() => MovieStudio, (movieStudio) => movieStudio.movie)
  @JoinColumn({ name: 'id', referencedColumnName: 'movie_id' })
  movieStudios: MovieStudio[];
}

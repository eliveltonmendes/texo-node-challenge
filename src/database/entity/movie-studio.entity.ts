import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Studio } from './studio.entity';

@Entity({ name: 'movie_studio' })
export class MovieStudio extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Studio)
  @JoinColumn({ name: 'studio_id' })
  studio: Studio;
}

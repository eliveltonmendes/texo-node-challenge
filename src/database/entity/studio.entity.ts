import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieStudio } from './movie-studio.entity';

@Entity({ name: 'studio' })
export class Studio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieStudio, (movieStudio) => movieStudio.movie)
  @JoinColumn({ name: 'id', referencedColumnName: 'studio_id' })
  movieStudios: MovieStudio[];
}

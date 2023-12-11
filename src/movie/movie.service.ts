import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MovieRepository } from '../database/repositories/movie.repository';
import { GetMoviesResponseDto, SaveMovieResponseDto } from './dto/response.dto';
import { SaveMovieDto } from './dto/body.dto';
import { Movie } from '../database/entity/movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getMovies(): Promise<GetMoviesResponseDto[]> {
    const movies = await this.movieRepository.getMovies();

    const response: GetMoviesResponseDto[] = movies.map((movie) => {
      return {
        id: movie.id,
        year: movie.year,
        title: movie.title,
        winner: movie.winner,
        producers: movie.movieProducers.map((movieProducer) => {
          return {
            id: movieProducer.producer.id,
            name: movieProducer.producer.name,
          };
        }),
        studios: movie.movieStudios.map((movieStudio) => {
          return {
            id: movieStudio.studio.id,
            name: movieStudio.studio.name,
          };
        }),
      };
    });

    return response;
  }

  async saveMovie(body: SaveMovieDto): Promise<SaveMovieResponseDto> {
    const { title, year, winner } = body;
    if (!title) throw new BadRequestException('title parameter is empty');
    if (!year) throw new BadRequestException('year parameter is empty');
    if (winner === undefined)
      throw new BadRequestException('winner parameter is empty');

    const movie = await this.movieRepository.findOneBy({ title: title.trim() });
    if (movie) throw new ForbiddenException('Movie already saved');

    return this.movieRepository.save({ title: title.trim(), year, winner });
  }
}

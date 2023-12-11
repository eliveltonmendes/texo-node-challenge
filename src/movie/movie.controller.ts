import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { GetMoviesResponseDto, SaveMovieResponseDto } from './dto/response.dto';
import { SaveMovieDto } from './dto/body.dto';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, type: GetMoviesResponseDto })
  async getMovies(): Promise<GetMoviesResponseDto[]> {
    return this.movieService.getMovies();
  }

  @Post('/')
  @ApiResponse({ status: HttpStatus.CREATED, type: SaveMovieResponseDto })
  async saveMovie(@Body() body: SaveMovieDto): Promise<SaveMovieResponseDto> {
    return this.movieService.saveMovie(body);
  }
}

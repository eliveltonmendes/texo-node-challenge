import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { MovieService } from '../../src/movie/movie.service';
import { SaveMovieDto } from '../../src/movie/dto/body.dto';

describe('MovieService', () => {
  let service: MovieService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = app.get<MovieService>(MovieService);
  });

  it('Should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('Save Movie', () => {
    it('Should save new movie', async () => {
      const payload: SaveMovieDto = {
        title: 'New movie',
        year: 2000,
        winner: false,
      };
      const response = await service.saveMovie(payload);

      expect(response.id).toBeDefined();
      expect(response.title).toBe(payload.title);
      expect(response.winner).toBeFalsy();
      expect(response.year).toBe(payload.year);
    });
  });
});

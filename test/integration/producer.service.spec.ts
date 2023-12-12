import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ProducerService } from '../../src/producer/producer.service';
import { MovieRepository } from '../../src/database/repositories/movie.repository';
import { ProducerRepository } from '../../src/database/repositories/producer.repository';
import { Repository } from 'typeorm';
import { MovieProducer } from '../../src/database/entity/movie-producer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProducerService', () => {
  let service: ProducerService;
  let movieRepository: MovieRepository;
  let producerRepository: ProducerRepository;
  let movieProducerRepository: Repository<MovieProducer>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = app.get<ProducerService>(ProducerService);
    movieRepository = app.get<MovieRepository>(MovieRepository);
    producerRepository = app.get<ProducerRepository>(ProducerRepository);
    movieProducerRepository = app.get(getRepositoryToken(MovieProducer));
  });

  it('Should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('Get interval winners', () => {
    beforeAll(async () => {
      const producer1 = await producerRepository.findOneBy({
        name: 'Matthew Vaughn',
      });

      const movie1 = await movieRepository.save({
        title: 'Movie 1',
        year: 2016,
        winner: true,
      });
      await movieProducerRepository.save({
        movie: movie1,
        producer: producer1,
      });

      const producer2 = await producerRepository.findOneBy({
        name: 'Joel Silver',
      });

      const movie2 = await movieRepository.save({
        title: 'Movie 2',
        year: 2004,
        winner: true,
      });
      await movieProducerRepository.save({
        movie: movie2,
        producer: producer2,
      });
    });

    it('Should return Joel as winner', async () => {
      const response = await service.getProducerIntervalPrizes();

      expect(response.max.length).toBe(2);
      expect(response.max[0].producer).toBe('Joel Silver');
      expect(response.max[0].interval).toBe(13);
      expect(response.max[1].producer).toBe('Matthew Vaughn');
      expect(response.max[1].interval).toBe(13);

      expect(response.min.length).toBe(2)
      expect(response.min[0].producer).toBe('Joel Silver');
      expect(response.min[0].interval).toBe(1);
      expect(response.min[1].producer).toBe('Matthew Vaughn');
      expect(response.min[1].interval).toBe(1);
    });
  });
});

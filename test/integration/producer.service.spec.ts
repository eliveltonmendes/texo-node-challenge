import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ProducerService } from '../../src/producer/producer.service';

describe('ProducerService', () => {
  let service: ProducerService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = app.get<ProducerService>(ProducerService);
  });

  it('Should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('Get interval winners', () => {
    it('Should return Joel as winner', async () => {
      const response = await service.getProducerIntervalPrizes();

      expect(response.max[0].producer).toBe('Matthew Vaughn');
      expect(response.max[0].interval).toBe(13);
      expect(response.max.length).toBe(1);

      expect(response.min[0].producer).toBe('Joel Silver');
      expect(response.min[0].interval).toBe(1);
    });
  });
});

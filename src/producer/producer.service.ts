import { Injectable } from '@nestjs/common';
import {
  ProducersIntervalDTO,
  ProducerWinnerIntervalResponseDto,
  WinDetailDto,
} from './dto/response.dto';
import { Producer } from '../database/entity/producer.entity';
import { ProducerRepository } from '../database/repositories/producer.repository';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  /**
   * @description Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
   * obteve dois prêmios mais rápido, seguindo a especificação de formato definida na
   * página 2;
   * @returns
   */
  async getProducerIntervalPrizes(): Promise<ProducerWinnerIntervalResponseDto> {
    const producers = await this.producerRepository.getWinnerProducers();
    const producersDto = this.assembleProducersDtoWithInterval(producers);

    return {
      max: this.findMaxWinnerProducer(producersDto),
      min: this.findMinWinnerProducer(producersDto),
    };
  }

  private assembleProducersDtoWithInterval(
    producers: Producer[],
  ): ProducersIntervalDTO[] {
    const response: ProducersIntervalDTO[] = [];

    producers.forEach((producer) => {
      const { movieProducers } = producer;

      for (let i = 1; i < movieProducers.length; i++) {
        response.push({
          interval: movieProducers[i].movie.year - movieProducers[i - 1].movie.year,
          previousWin: movieProducers[i - 1].movie.year,
          followingWin: movieProducers[i].movie.year,
          producer: producer
        })
      }
    });

    return response.filter((item) => item.interval != 0 && item.interval != 99);
  }

  private findMaxWinnerProducer(
    producersDto: ProducersIntervalDTO[],
  ): WinDetailDto[] {
    const interval = Math.max(...producersDto.map((prize) => prize.interval));

    return this.findWinnerByInterval(producersDto, interval);
  }

  private findMinWinnerProducer(
    producersDto: ProducersIntervalDTO[],
  ): WinDetailDto[] {
    const interval = Math.min(...producersDto.map((prize) => prize.interval));

    return this.findWinnerByInterval(producersDto, interval);
  }

  private findWinnerByInterval(
    producersDto: ProducersIntervalDTO[],
    interval: number,
  ): WinDetailDto[] {
    const producers = producersDto.filter(
      (producer) => producer.interval == interval,
    );

    return producers.map((producer) => {
      return {
        producer: producer.producer.name,
        interval: interval,
        previousWin: producer.previousWin,
        followingWin: producer.followingWin,
      };
    });
  }
}

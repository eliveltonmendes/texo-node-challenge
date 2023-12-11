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
    const response: ProducersIntervalDTO[] = producers.map((producer) => {
      const { movieProducers } = producer;

      let interval = 99;
      let previousWin: number = 0;
      let followingWin: number = 0;
      for (let i = 1; i < movieProducers.length; i++) {
        const newInterval =
          movieProducers[i].movie.year - movieProducers[i - 1].movie.year;

        if (newInterval < interval) {
          interval = newInterval;
          previousWin = movieProducers[i - 1].movie.year;
          followingWin = movieProducers[i].movie.year;
        }
      }

      return {
        producer,
        interval,
        previousWin,
        followingWin,
      };
    });

    return response.filter((item) => item.interval != 0 && item.interval != 99);
  }

  private findMaxWinnerProducer(
    producersDto: ProducersIntervalDTO[],
  ): WinDetailDto[] {
    const maxInterval = Math.max(
      ...producersDto.map((prize) => prize.interval),
    );

    const producers = producersDto.filter(
      (producer) => producer.interval == maxInterval,
    );

    return producers.map((producer) => {
      return {
        producer: producer.producer.name,
        interval: maxInterval,
        previousWin: producer.previousWin,
        followingWin: producer.followingWin,
      };
    });
  }

  private findMinWinnerProducer(
    producersDto: ProducersIntervalDTO[],
  ): WinDetailDto[] {
    const maxInterval = Math.min(
      ...producersDto.map((prize) => prize.interval),
    );

    const producers = producersDto.filter(
      (producer) => producer.interval == maxInterval,
    );

    return producers.map((producer) => {
      return {
        producer: producer.producer.name,
        interval: maxInterval,
        previousWin: producer.previousWin,
        followingWin: producer.followingWin,
      };
    });
  }
}

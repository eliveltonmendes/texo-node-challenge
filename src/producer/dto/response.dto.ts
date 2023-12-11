import { ApiProperty } from '@nestjs/swagger';
import { Producer } from '../../database/entity/producer.entity';

export class WinDetailDto {
  @ApiProperty({ name: 'producer' })
  producer: string;

  @ApiProperty({ name: 'interval' })
  interval: number;

  @ApiProperty({ name: 'previousWin', description: 'Year of the prize' })
  previousWin: number;

  @ApiProperty({ name: 'followingWin', description: 'Year of the prize' })
  followingWin: number;
}

export class ProducerWinnerIntervalResponseDto {
  @ApiProperty({ type: WinDetailDto })
  min: WinDetailDto[];
  @ApiProperty({ type: WinDetailDto })
  max: WinDetailDto[];
}

export class ProducersIntervalDTO {
  producer: Producer;
  interval: number;
  previousWin: number;
  followingWin: number;
}

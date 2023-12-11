import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerWinnerIntervalResponseDto } from './dto/response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('producer')
@ApiTags('Producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get('/interval-prizes')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProducerWinnerIntervalResponseDto,
  })
  async getProducerIntervalPrizes(): Promise<ProducerWinnerIntervalResponseDto> {
    return this.service.getProducerIntervalPrizes();
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { Producer } from "../../database/entity/producer.entity";
import { Studio } from "../../database/entity/studio.entity";

export class GetMoviesResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  winner: boolean;

  @ApiProperty({ type: Producer })
  producers: Partial<Producer>[];

  @ApiProperty({ type: Studio })
  studios: Partial<Studio>[];
}

export class SaveMovieResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  winner: boolean;
}

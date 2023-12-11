import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  winner: boolean;
}

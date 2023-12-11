export class CsvRowDto {
  year: number;
  movie: string;
  producers: string[];
  studios: string[];
  winner: boolean;

  initialize(
    year: number,
    movie: string,
    producers: string,
    studios: string,
    winner: string,
  ) {
    this.year = year;
    this.movie = movie.trim();
    this.studios = studios.split(',');
    this.producers = producers.split(',');
    this.winner = winner === 'yes';
    return this;
  }
}

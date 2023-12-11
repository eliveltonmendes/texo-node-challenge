import { Injectable } from '@nestjs/common';
import { CsvRowDto } from './dto/upload.dto';
import { Movie } from '../database/entity/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as readline from 'readline';
import { Readable } from 'stream';
import { Studio } from '../database/entity/studio.entity';
import { MovieStudio } from '../database/entity/movie-studio.entity';
import { Producer } from '../database/entity/producer.entity';
import { MovieProducer } from '../database/entity/movie-producer.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,

    @InjectRepository(Studio)
    private studioRepository: Repository<Studio>,

    @InjectRepository(MovieProducer)
    private movieProducerRepository: Repository<MovieProducer>,

    @InjectRepository(MovieStudio)
    private movieStudioRepository: Repository<MovieStudio>,
  ) {}

  async uploadFileToDatabase(file: Express.Multer.File) {
    const csvDataToUpload = await this.fillCsvData(file);

    csvDataToUpload.shift();
    await this.saveCsvFile(csvDataToUpload);
  }

  async saveCsvFile(csvDataToUpload: CsvRowDto[]) {
    for (const data of csvDataToUpload) {
      const movie = await this.saveMovie(data.movie, data.year, data.winner);
      await this.saveProducers(movie, data.producers);
      await this.saveStudios(data.studios, movie);
    }
  }

  private async fillCsvData(file): Promise<CsvRowDto[]> {
    const parsed: CsvRowDto[] = [];

    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const lines = readline.createInterface({
      input: readableFile,
    });

    for await (const line of lines) {
      const parsedLine = line.split(';');
      const year = Number(parsedLine[0]);
      const movie = parsedLine[1];
      const studios = parsedLine[2];
      const producers = parsedLine[3];
      const winner = parsedLine[4];

      parsed.push(
        new CsvRowDto().initialize(year, movie, studios, producers, winner),
      );
    }

    return parsed;
  }

  private async saveMovie(
    title: string,
    year: number,
    winner: boolean,
  ): Promise<Movie> {
    let movie = await this.movieRepository.findOneBy({
      title: title.trim(),
    });

    if (movie) return movie;

    movie = new Movie();
    movie.title = title.trim();
    movie.winner = winner;
    movie.year = year;

    return await this.movieRepository.save(movie);
  }

  async saveProducers(movie: Movie, producers: string[]) {
    for (const producerNameWithAnd of producers) {
      for (const producerName of producerNameWithAnd.split(' and ')) {
        let producer = await this.producerRepository.findOneBy({
          name: producerName.trim(),
        });

        if (producerName == '') return;

        if (!producer) {
          producer = new Producer();
          producer.name = producerName.trim();
          await this.producerRepository.save(producer);
        }

        await this.saveMovieProducer(movie, producer);
      }
    }
  }

  async saveMovieProducer(
    movie: Movie,
    producer: Producer,
  ): Promise<MovieProducer> {
    let movieProducer = await this.movieProducerRepository.findOneBy({
      movie: { id: movie.id },
      producer: { id: producer.id },
    });

    if (movieProducer) return movieProducer;

    movieProducer = new MovieProducer();
    movieProducer.movie = movie;
    movieProducer.producer = producer;

    return await this.movieProducerRepository.save(movieProducer);
  }

  private async saveStudios(studios: string[], movie: Movie) {
    for (const studio of studios) {
      let newStudio = await this.studioRepository.findOneBy({
        name: studio.trim(),
      });

      if (!newStudio) {
        newStudio = new Studio();
        newStudio.name = studio.trim();
        await this.studioRepository.save(newStudio);
      }

      await this.saveMovieStudio(movie, newStudio);
    }
  }

  private async saveMovieStudio(
    movie: Movie,
    studio: Studio,
  ): Promise<MovieStudio> {
    const movieStudio = new MovieStudio();
    movieStudio.movie = movie;
    movieStudio.studio = studio;
    return await this.movieStudioRepository.save(movieStudio);
  }
}

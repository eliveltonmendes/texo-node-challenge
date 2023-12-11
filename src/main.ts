import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { INestApplication, Logger } from '@nestjs/common';
import { UploadService } from './upload/upload.service';
import { CsvRowDto } from './upload/dto/upload.dto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function uploadInitialData(app: INestApplication) {
  Logger.log('Uploading movies');
  const results = [];
  const csvDto: CsvRowDto[] = [];

  fs.createReadStream(__dirname + '/../resources/movielist.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      for (let i = 0; i < results.length; i++) {
        csvDto.push(
          new CsvRowDto().initialize(
            results[i].year,
            results[i].title,
            results[i].producers,
            results[i].studios,
            results[i].winner,
          ),
        );
      }

      app.get(UploadService).saveCsvFile(csvDto);
      Logger.log('Finished uploading movies');
    });
}

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Producer Prizes Api')
    .setDescription('Prizes api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  await uploadInitialData(app);

  await app.listen(3000);
}

bootstrap();

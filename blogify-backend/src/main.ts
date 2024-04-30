import { NestFactory } from '@nestjs/core';
import { BlogifyApiServiceModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './application/interceptor';

class Main {
  private application: INestApplication;

  constructor() {
    this.initialize()
      .then(() => this.initializeOpenApi())
      .then(() => this.bootstrap());
  }

  private async initializeOpenApi(): Promise<void> {
    const { name, version } = await import('../package.json');

    const config = new DocumentBuilder()
      .setTitle(name)
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(this.application, config);
    SwaggerModule.setup('openapi', this.application, document);
  }

  private async initialize(): Promise<void> {
    this.application = await NestFactory.create(BlogifyApiServiceModule, {
      cors: true,
    });

    this.application.useGlobalInterceptors(new LoggingInterceptor());

    this.application.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        stopAtFirstError: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
  }

  private async bootstrap(): Promise<void> {
    await this.application.listen(3000);
  }
}

new Main();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleController, AuthorController } from './application/controllers';
import {
  ArticleService,
  AuthorService,
  FirebaseAdminService,
} from './domain/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, AuthorEntity } from './infrastructure/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          url: configService.getOrThrow('DATABASE_URL'),
          entities: [AuthorEntity, ArticleEntity],
          type: 'postgres',
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AuthorEntity, ArticleEntity]),
  ],
  controllers: [ArticleController, AuthorController],
  providers: [AuthorService, ArticleService, FirebaseAdminService],
  exports: [AuthorService, ArticleService, FirebaseAdminService],
})
export class BlogifyApiServiceModule {}

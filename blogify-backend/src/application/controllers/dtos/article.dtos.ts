import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleRequestDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  introduction: string;

  @ApiProperty()
  @IsString()
  content: string;
}

export class UpdateArticleRequestDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  introduction?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;
}

export class FindArticlesQueryDto {
  @ApiProperty({
    enum: ['desc', 'asc'],
  })
  @IsEnum(['desc', 'asc'])
  @IsOptional()
  direction?: 'desc' | 'asc' = 'desc';

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  take?: number = 24;
}

export class ArticlesPaginatedResponseMetaDto {
  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  count: number;
}

export class ArticlesPaginatedResponseDataAuthorDto {
  @ApiProperty()
  displayName: string;
}

export class ArticlesPaginatedResponseDataDto {
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  introduction: string;

  @ApiProperty()
  content: string;

  @ApiProperty({
    type: () => ArticlesPaginatedResponseDataAuthorDto,
  })
  author: ArticlesPaginatedResponseDataAuthorDto;
}

export class ArticlesPaginatedResponseDto {
  @ApiProperty({
    type: () => ArticlesPaginatedResponseMetaDto,
  })
  meta: ArticlesPaginatedResponseMetaDto;

  @ApiProperty({
    type: () => Array<ArticlesPaginatedResponseDataDto>,
  })
  data: ArticlesPaginatedResponseDataDto[];
}

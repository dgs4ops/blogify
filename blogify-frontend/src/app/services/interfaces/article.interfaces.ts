export interface CreateArticleRequest {
  title: string;

  introduction: string;

  content: string;
}

export interface UpdateArticleRequest {
  id: string;

  title?: string;

  introduction?: string;

  content?: string;
}

export interface FindArticlesQueryRequest {
  direction?: 'desc' | 'asc';

  page?: number;

  take?: number;
}

export interface ArticlesPaginatedMetaResponse {
  hasPreviousPage: boolean;

  hasNextPage: boolean;

  count: number;
}

export interface ArticlesPaginatedDataAuthorResponse {
  displayName: string;
}

export class ArticlesPaginatedResponseData {
  id: string;

  createdAt: string;

  createdBy: string;

  title: string;

  introduction: string;

  content: string;

  author: ArticlesPaginatedDataAuthorResponse;
}

export interface ArticlesPaginatedResponse {
  meta: ArticlesPaginatedMetaResponse;

  data: ArticlesPaginatedResponseData[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ArticlesPaginatedResponse,
  CreateArticleRequest,
  ArticlesPaginatedResponseData,
  UpdateArticleRequest,
} from './interfaces';

@Injectable()
export class ArticleApiClientService {
  constructor(private readonly httpClient: HttpClient) {}

  createArticle(
    request: CreateArticleRequest,
  ): Observable<undefined> {
    return this.httpClient.post<undefined>(
      'v1/articles',
      JSON.stringify(request),
    );
  }

  updateArticle(
    request: UpdateArticleRequest,
  ): Observable<undefined> {
    return this.httpClient.put<undefined>('v1/articles', JSON.stringify(request));
  }

  getAuthorArticles(params?: any): Observable<ArticlesPaginatedResponse> {
    return this.httpClient.get<ArticlesPaginatedResponse>('v1/articles/by-author', { params });
  }

  getArticles(params?: any) {
    return this.httpClient.get<ArticlesPaginatedResponse>('v1/articles', { params });
  }

  getArticle(id: string) {
    return this.httpClient.get<ArticlesPaginatedResponseData>(`v1/articles/${id}`);
  }

  deleteArticle(id: string) {
    return this.httpClient.delete<undefined>(`v1/articles/${id}`);
  }

  // .. add other methods here & retest with the interceptor (see index.ts)
}

import { Injectable } from '@angular/core';
import { AuthorMeResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorApiClientService {
  constructor(private readonly httpClient: HttpClient) {}

  getAuthor(): Observable<AuthorMeResponse> {
    return this.httpClient.get<AuthorMeResponse>('v1/authors/me');
  }
}

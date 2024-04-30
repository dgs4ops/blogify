import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class BlogifyApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const request = req.clone({ url: `${environment.baseURL}/${req.url}` });

    const accessToken: string | undefined = localStorage.getItem('accessToken');

    if (accessToken) {
      request.headers.append('Authorization', `Bearer ${accessToken}`);
    }
    return next.handle(request);
  }
}

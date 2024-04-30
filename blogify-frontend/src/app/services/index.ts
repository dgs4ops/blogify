import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export * from './article_api_client.service';
export * from './author_api_client.service';
export * from './interfaces';

export const blogifyApiInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    url: `${environment.baseURL}/${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return next(request);
};

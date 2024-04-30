import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { v4 } from 'uuid';
import { IDENTITY_HEADER_NAME } from '../decorators';

const REQUEST_ID_HEADER_NAME: string = 'Blogify-RequestId';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    if (context.getType() == 'http') {
      return this.interceptHttp(context.switchToHttp(), next);
    }
    return next.handle();
  }

  private setRequestIdToResponseHeader(response: Response, requestId: string) {
    if (!response.hasHeader(REQUEST_ID_HEADER_NAME))
      response.setHeader(REQUEST_ID_HEADER_NAME, requestId);
  }

  private interceptHttp(context: HttpArgumentsHost, next: CallHandler) {
    const request: Request = context.getRequest();

    const requestId: string =
      (request.headers[REQUEST_ID_HEADER_NAME] as string) ?? v4();

    const mappedIamId: string =
      request.body[IDENTITY_HEADER_NAME]?.mappedIamId ?? 'unknown';

    this.logger.verbose(
      `(${requestId}) - ${request.method}: ${request.path} - REQUEST:`,
      {
        ipAddress: request.ip,
        mappedIamId,
      },
    );
    const startTime: number = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response: Response = context.getResponse();

        this.setRequestIdToResponseHeader(response, requestId);

        this.logger.verbose(
          `(${requestId}) - ${request.method}: ${request.path} - RESPONSE:`,
          {
            statusCode: response.statusCode,
            took: `${Date.now() - startTime}ms`,
          },
        );
      }),
      catchError((error: unknown) => {
        this.setRequestIdToResponseHeader(context.getResponse(), requestId);
        throw error;
      }),
    );
  }
}

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IResponse<T> {
  data: T;
  links?: any[];
  meta?: any;
}

export class SuccessInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data: { data: any, links: Array<any>, meta: Array<any> }) => {
        if (
          data &&
          data.hasOwnProperty('links') &&
          data.hasOwnProperty('meta')
        ) {
          return { data: data.data, links: data.links, meta: data.meta };
        } else if (data && data.hasOwnProperty('links')) {
          return { data: data.data, links: data.links };
        } else if (data && data.hasOwnProperty('meta')) {
          return { data: data.data, meta: data.meta };
        } else {
          return { data: data.data };
        }

      }),
    );
  }
}

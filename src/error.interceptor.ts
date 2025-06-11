import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from '@nestjs/jwt'
@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      message: 'unhandled error occured',
      timestamp: new Date().toISOString(),
    };

    switch (true) {
      case exception instanceof HttpException: {
        httpStatus = exception.getStatus();
        const exResponse = exception.getResponse();
        console.log(exResponse)
        responseBody.message =
          typeof exResponse === 'object' && exResponse !== null
            ? (exResponse as { message: string }).message
            : 'Unknown error found';
        break;
      }

      case exception instanceof QueryFailedError: {
        httpStatus = HttpStatus.BAD_REQUEST;
        responseBody.message = `Database query failed: ${exception.message}`;
        break;
      }

      case exception instanceof EntityNotFoundError: {
        httpStatus = HttpStatus.NOT_FOUND;
        responseBody.message = `Entity not found: ${exception.message}`;
        break;
      }

      case exception instanceof TypeORMError: {
        httpStatus = HttpStatus.BAD_REQUEST;
        responseBody.message = `TypeORM error: ${exception.message}`;
        break;
      }

      case exception instanceof JsonWebTokenError: {
        httpStatus = HttpStatus.BAD_REQUEST
        responseBody.message = `jwt error ${exception.message}`
      }

      case exception instanceof Error: {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        responseBody.message = exception.message;
        console.log('Error instance')
        break;
      }

      default: {
        console.error('Unknown exception caught:', exception);
        break;
      }
    }
    console.log(responseBody)
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

import { Injectable } from '@nestjs/common';
import { IResponse } from './success.interceptor';

@Injectable()
export class AppService {
  getHello(): IResponse<{}> {
    return { data: "hello world" };
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExpectionFilters implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errorMessage: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = exception.message || 'Có lỗi xảy ra';
    }

    const errResponse = {
      message: 'Có lỗi xảy ra',
      error: errorMessage,
      timeStamp: Date.now(),
      path: request.url,
    };

    response.status(status).json(errResponse);
  }
}

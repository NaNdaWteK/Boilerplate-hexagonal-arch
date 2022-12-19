import * as Application from 'koa';
import httpStatus from 'http-status';
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';
import configuration from '../../config/default';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class ErrorHandler implements KoaMiddlewareInterface {
  public async use(context: Application.Context, next: Application.Next) {
    try {
      await next();
    } catch (error) {
      configuration.infra.logger.error(`Error: ${error.message}`, {
        stack: error.stack,
      });
      const status = error.httpCode || httpStatus.INTERNAL_SERVER_ERROR;
      context.status = status;
      context.body = {
        message: error.message,
      };
      return;
    }
  }
}

import Koa from 'koa';
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
@Service()
@Middleware({ type: 'before' })
export class CorsHandler implements KoaMiddlewareInterface {
  public async use(ctx: Koa.Context, next: Koa.Next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  }
}

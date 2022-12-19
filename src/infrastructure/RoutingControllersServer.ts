import Router from 'koa-router';
import * as rc from 'routing-controllers';
import * as to from 'typeorm';
import morgan from 'koa-morgan';
import { koaSwagger } from 'koa2-swagger-ui';
import config from '../config/default';
import HealthzRoutingController from './controllers/HealthzRoutingController';
import LoggerInterface from './_core/LoggerInterface';
import { CorsHandler } from './middlewares/CorsHandler';
import { ErrorHandler } from './middlewares/ErrorHandler';
import Docs from './controllers/Docs';

export interface ServerInterface {
  start(): void;
  stop(): void;
}
export class RoutingControllerServer implements ServerInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public server: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly app: any;
  private readonly router: Router;
  constructor(
    private readonly port: string,
    private readonly logger: LoggerInterface
  ) {
    this.logger = logger;
    this.router = new Router();
    this.app = rc.createKoaServer({
      middlewares: [ErrorHandler, CorsHandler],
      controllers: [HealthzRoutingController, Docs],
      defaultErrorHandler: false,
      cors: true,
    });
    this.configure();
  }

  public start() {
    this.server = this.app.listen(this.port, () => {
      this.logger.info(`Listening on port ${config.port}...`);
    });
    const dataSource = new to.DataSource({
      type: 'postgres',
      database: config.databaseName,
      synchronize: true,
      host: config.databaseHost,
      port: parseInt(config.databasePort as string),
      username: config.databaseUser,
      password: config.databasePassword,
    });
    dataSource.initialize().then(this.databaseReady);
  }
  public stop() {
    this.app.close();
  }

  private configure() {
    this.app.use(new CorsHandler().use);
    this.app.use(new ErrorHandler().use);
    this.router.get(
      '/docs',
      koaSwagger({
        title: 'Billar API',
        swaggerOptions: {
          url: '/api/v1/docs',
        },
      })
    );
    this.app.use(morgan('dev'));
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }

  private databaseReady() {
    config.infra.logger.info('Database ready...');
  }
}

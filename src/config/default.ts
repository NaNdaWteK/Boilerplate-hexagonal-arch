import * as dotenv from 'dotenv';
import { RoutingControllerServer } from '../infrastructure/RoutingControllersServer';
import PinoLogger from '../infrastructure/_core/PinoLogger';
dotenv.config();

function die(what: Error | string): never {
  if (typeof what === 'string') {
    throw new Error(what);
  }
  throw what;
}

const config = {
  environment:
    process.env.NODE_ENV ??
    die('Environment variable "NODE_ENV" wasn\'t defined!'),
  port:
    process.env.RESTAPI_PORT ??
    die('Environment variable "RESTAPI_PORT" wasn\'t defined!'),
  version:
    process.env.RESTAPI_VERSION ??
    die('Environment variable "RESTAPI_VERSION" wasn\'t defined!'),
  databaseName:
    process.env.DATABASE_NAME ??
    die('Environment variable "DATABASE_NAME" wasn\'t defined!'),
  databaseUser:
    process.env.DATABASE_USER ??
    die('Environment variable "DATABASE_USER" wasn\'t defined!'),
  databasePassword:
    process.env.DATABASE_PASSWORD ??
    die('Environment variable "DATABASE_PASSWORD" wasn\'t defined!'),
  databaseHost:
    process.env.DATABASE_HOST ??
    die('Environment variable "DATABASE_HOST" wasn\'t defined!'),
  databasePort:
    process.env.DATABASE_PORT ??
    die('Environment variable "DATABASE_PORT" wasn\'t defined!'),
};
const logger = new PinoLogger();
const app = new RoutingControllerServer(process.env.RESTAPI_PORT || '', logger);
const infrastructure: {
  infra: {
    logger: PinoLogger;
    app: RoutingControllerServer;
  };
} = {
  infra: {
    logger,
    app,
  },
};
const configuration = { ...config, ...infrastructure };
export default configuration;

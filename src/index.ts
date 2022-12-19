import 'reflect-metadata';
import * as rc from 'routing-controllers';
import * as td from 'typedi';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import schemas from './infrastructure/schemas';

rc.useContainer(td.Container);

import App from './App';
import Swagger from './Swagger';

const storage = rc.getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {},
  {
    definitions: schemas,
  }
);

Swagger.spec = spec;

export default App.main();

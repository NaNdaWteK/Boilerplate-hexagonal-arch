import { Service } from 'typedi';
import config from '../../config/default';

@Service()
export default class HealthzController {
  constructor(private logger = config.infra.logger) {}
  async execute() {
    this.logger.info('Health endpoint executed');
    return { status: 'ok' };
  }
}

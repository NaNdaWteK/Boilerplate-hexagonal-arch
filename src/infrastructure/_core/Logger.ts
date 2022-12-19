import { Service } from 'typedi';
import config from '../../config/default';
@Service()
export default class Logger {
  static init() {
    return config.infra.logger;
  }
}

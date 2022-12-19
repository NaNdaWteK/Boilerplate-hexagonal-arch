import config from './config/default';

export default class App {
  static async main() {
    const app = config.infra.app;
    app.start();
    return app.server;
  }
}

import * as dotenv from 'dotenv';
// import * as moduleAlias from 'module-alias/register';
import path from 'path';
import express, {Application} from 'express'; // eslint-disable-line
// import logger from './libs/winstonLogger';
import router from './routes';
import getCurrentIP from './libs/getCurrentIP';

class App {
  private dotenv: any;
  private app: Application;
  private port: string | number;
  private localIP: string | number;

  constructor() {
    this.dotenv = dotenv.config();
    this.port = process.env.PORT ?? 4444;
    this.localIP = getCurrentIP();
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
    this.assets();
    this.template();
  }

  private loadMiddlewares(): void {
    // this.app.use(logger);
  }

  private loadRoutes(): void {
    this.app.use(router);
  }

  private assets(): void {
    this.app.use('assets', express.static(`${process.env.PWD}/public/assets`));
  }

  private template(): void {
    this.app.set('views', path.join(`${process.env.PWD}/public`, 'views'));
    this.app.set('view engine', 'pug');
  }

  public listen(): void {
    this.app.listen(this.port, <T>(): void => {
      console.log(`Server listening on ${this.localIP}:${this.port}`);
    });
  }
}

new App().listen();

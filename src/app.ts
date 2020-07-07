import * as dotenv from "dotenv";
// import * as moduleAlias from 'module-alias/register';
import express, { Application } from "express"; // eslint-disable-line
// import logger from './libs/winstonLogger';
import router from "./routes";
import getCurrentIP from "./libs/getCurrentIP";
import { errorHandler } from "./libs/ErrorHandler";
//import * as cors from "cors";
//import * as helmet from "helmet";
//import * as bodyParser from "body-parser";

class App {
  private dotenv: any;
  private app: Application;
  private port: string | number;
  private localIP: string | number;

  constructor() {
    this.dotenv = dotenv.config();
    this.port = process.env.PORT || 4444;
    this.localIP = getCurrentIP();
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
    this.assets();
    //this.errorMiddleware();
  }

  private loadMiddlewares(): void {
    // this.app.use(logger);
    //this.app.use(bodyParser.json());
    //this.app.use(bodyParser.urlencoded({ extended: true }));
    //this.app.use(cors());
    //this.app.use(helmet());
  }

  private loadRoutes(): void {
    this.app.use(router);
  }

  private assets(): void {
    this.app.use("assets", express.static(`${process.env.PWD}/public/assets`));
  }

  private errorMiddleware(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Server listening on ${this.localIP}:${this.port}`);
    });
  }
}

new App().listen();

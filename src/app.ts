import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import logger from "morgan";
import { env } from "./configs/env";
import Log from "./utils/Logger";
import http from "http";
import errorMiddleware from "./middlewares/ErrorMiddleware";
import RootConfig from "./configs/RootConfig";

class App {
  public app: express.Application;
  public port: string | number;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.port = env.app.port;

    this.initializeStatic();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    if (env.isProduction) {
      this.app.use(helmet({ contentSecurityPolicy: false }));
      this.app.use(hpp());
      this.app.use(logger("combined"));
    } else {
      this.app.use(logger("dev"));
    }

    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private initializeStatic() {
    this.app.use(express.static("public"));
  }

  private initializeRoutes() {
    const rootConfig = new RootConfig();
    const controllers = rootConfig.getControllers();
    controllers.forEach((ctrl) => {
      this.app.use("/", ctrl.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.server = this.app.listen(this.port, () => {
      Log.info(`🚀 Server is running on the port ${this.port}`);
    });
  }
}

export default App;

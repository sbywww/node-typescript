import PostController from "../controllers/PostController";
import Controller from "../interfaces/Controller";

class RootConfig {
  private controllers: Controller[];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.controllers = [new PostController()];
  }

  public getControllers() {
    return this.controllers;
  }
}

export default RootConfig;

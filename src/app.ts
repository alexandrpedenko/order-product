import express, { Express } from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import { errorMiddleware } from './core/middlewares';
import { AppRouter } from './app.router';

export class App {
  app: Express;
  router: AppRouter;
	server: Server;

  constructor() {
    dotenv.config();
    this.app = express();
    this.router = new AppRouter(this.app);
	}

  public init() {
    this.setCORS();
    this.setExpressMiddlewares();
    this.setRouter();
    this.setCustomMiddlewares();
    this.setDbConnection();
    this.runServer();
  }

  private setCORS() {
    this.app.use((req, res, next) => {
      res.append('Access-Control-Allow-Credentials', 'true');
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Expose-Headers', 'X-Total-Count');
      next();
    });
  }

  private setExpressMiddlewares() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private setRouter() {
    this.router.init();
  }

  private setCustomMiddlewares() {
    this.app.use(errorMiddleware);
  }

  private setDbConnection() {
    mongoose.connect(process.env.DB_URI)
      .then(() => console.log('MongoDB connected!'))
      .catch((error) => console.log(error));
  }

  private runServer() {
    const port = this.app.get('port');
    this.server = this.app.listen(port, () =>
      console.log(`Server started on http://localhost:${port}`)
    );

    return this.server;
  }
}

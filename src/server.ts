import express, { Application } from "express";
import compression from "compression";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_DATABASE } from "./env";
import routes from "./routes";

export default class App {
  public app: Application;
  public port: number;

  constructor(port) {
    this.app = express();
    this.port = port;

    this.connectToMongo();
    this.initializeApp();
  }

  private connectToMongo() {
    connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}`)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((e) => {
        console.error("There was an error connecting to MongoDB:");
        console.error(e);
      });
  }

  private initializeApp() {
    this.app.use(compression());
    this.app.use(express.static('./public'));
    this.app.use(cors());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
    this.app.use('/', routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port http://localhost:${this.port}`);
    });
  }
}

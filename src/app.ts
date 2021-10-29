import express from "express";
import helmet from "helmet";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`app running at http://localhost:${port}`);

  await connect();

  routes(app);
});

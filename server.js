import express, { urlencoded, json } from "express";
import { once } from "./config/connection.js";
import models from "./models/index.js";
import routes from "./routes/index.js";

const cwd = process.cwd();

const PORT = 3001;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(routes);

once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

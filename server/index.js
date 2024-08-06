import express from "express";
import cors from "cors";
import connectDatabase from "./src/config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chalk from "chalk";
import routes from './src/routes/index.js';
import errorConverter from "./src/middlewares/errorConverter.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Define routes
app.use('/v1', routes);

// Error handling middleware
app.use(errorConverter);
app.use(errorHandler);

// Connect to the database and seed data
(async () => {
  await connectDatabase();

  // Start the server
  app.listen(port, () => {
    console.log(chalk.cyan.bold(`Server listening at http://localhost:${port}`));
  });
})();

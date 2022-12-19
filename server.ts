import express, { Request, Response } from "express";
import Logging from "./library/Logging";
import mongoose from "mongoose";
const app = express();
var cors = require('cors')
const router = express.Router();
const responseTime = require('response-time')
require("dotenv").config();

const port = process.env.PORT || 3000;
const indexRoutes = require("./routes/index.routes");
const bookRoutes = require("./routes/book.routes");

/** Connect to MongoDB */
mongoose.connect(
  process.env.MONGODB_URL || "",
  {
    retryWrites: true,
    w: "majority",
  }
).then((res) => {
  Logging.info('Connected to MongoDB')
}).catch((error: Error) => {
  console.log(error.message);
  Logging.error('Cannot connect to MongoDB')
});

/** Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(responseTime((req: Request, res: Response, time: any) => {
  // log the responseTime with URL and method
  res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
}))

/** Routes */
app.use("/", bookRoutes);

app.listen(port, () => {
  Logging.info(`Example app listening on port ${port}`);
});
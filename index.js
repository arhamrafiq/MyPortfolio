import express, { json } from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";
import colors from "colors";
import authRoute from "./routes/authRoute.js";
import loginRoute from "./routes/loginRoute.js";
import pending from "./models/pending.js";
import manageRoute from "./routes/manage.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';

// Managing the Unverified User || Verification Pending Users
setInterval(async () => {
  await pending.deleteMany({ Expires: { $lt: Date() } });
}, 60 * 1000);

// configuring dotenv
dotenv.config();

// configuring database
connectdb();

// es  module fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// setting express app
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__path, "./my-react-app/build")));

// Routes
app.use("/api/v1/reg", authRoute);
app.use("/api/v1/log", loginRoute);
app.use("/api/v1/manage", manageRoute);

// setting API
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./my-react-app/build/index.html"));
});

// Setting Port
const port = process.env.port || 8080;

// listing our app
app.listen(port, () => {
  console.log(`App is listening on port ${port}`.bgWhite.blue);
});

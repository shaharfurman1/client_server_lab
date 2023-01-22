import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import path from "path";

import userRoute from "./routes/users.js";
import treatmentsRoute from "./routes/treatments.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.static(__dirname));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoute);
app.use("/treatments", treatmentsRoute);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/html/index.html")));
app.get("/index", (req, res) => res.sendFile(path.join(__dirname, "/html/index.html")));
app.get("/tables", (req, res) => res.sendFile(path.join(__dirname, "/html/tables.html")));
app.get("/about-us", (req, res) => res.sendFile(path.join(__dirname, "/html/about_us.html")));

app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "/html/login.html")));
app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "/html/signup.html")));
app.get("/forgot-password", (req, res) => res.sendFile(path.join(__dirname, "/html/forgot-password.html")));

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/html/404.html"));
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.sendFile(path.join(__dirname, "/html/404.html"));
    return;
  }

  // default to plain-text. send()
  res.sendFile(path.join(__dirname, "/html/404.html"));
});

const port = process.env.PORT || 3000;

const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;

const CONNECTION_URL = `mongodb+srv://${username}:${password}@cluster0.a88rnen.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB succussfully.");
    app.listen(port, () => {
      console.log("listening...  http://localhost:" + port);
    });
  })
  .catch((err) => console.log(err));

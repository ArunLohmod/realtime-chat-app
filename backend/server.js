const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/user/", userRoutes);

app.listen(
  process.env.PORT,
  console.log(`app is running at port ${process.env.PORT}`)
);

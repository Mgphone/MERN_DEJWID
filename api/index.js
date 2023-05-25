const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const app = express();
const connetDb = require("./config/dbConn");
// const e = require("express");
// const { log } = require("console");
const jwt = require("jsonwebtoken");
const Port = process.env.port;
const secret = "adfadfadfadfw3434";
connetDb;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

  // res.json('test okay')
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //user login
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) console.log(err);
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.listen(4000, (req, res) => {
  console.log(`server is listeing on port ${Port} `);
});

require("dotenv").config();
const bcrypt = require("bcrypt");
const fs = require("fs");
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const app = express();
const connetDb = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const Port = process.env.port;
const secret = "adfadfadfadfw3434";
const multer = require("multer");
const path = require("path");
const uploadMiddleware = multer({ dest: "uploads/" });

connetDb;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
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
  if (userDoc === null) {
    res.status(400).json("Wrong Credentials");
  } else {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //user login
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("Wrong Credentials");
    }
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  fs.renameSync(path, path + "." + ext);
  res.json({ files: req.file });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000, (req, res) => {
  console.log(`server is listeing on port ${Port} `);
});

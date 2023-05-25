const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connect to DB"))
  .catch((err) => console.log(err));

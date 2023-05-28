const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    // author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timesamps: true }
);

const Post = (module.exports = mongoose.model("Post", PostSchema));

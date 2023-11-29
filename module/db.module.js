import mongoose from "mongoose";

// let url = "mongodb://127.0.0.1:27017/mangers";
const url =
  "mongodb+srv://adityamaurya07:42nwFsAf53aCUEkS@cluster0.8wr3ax0.mongodb.net/";

mongoose.connect(url);
console.log("connected");

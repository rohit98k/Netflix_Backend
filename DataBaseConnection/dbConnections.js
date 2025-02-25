const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });

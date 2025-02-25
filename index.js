const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const cookie_parser = require("cookie-parser");
require("./DataBaseConnection/dbConnections");
const userRoute = require("./Routes/userRoute");

dotenv.config({
  path: ".env",
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Demo route
app.get("/", (req, res) => {
  res.send("I am Mantu Kumar Morya");
});

// API routes
app.use("/api/v1/user", userRoute);
// Corrected the route to include a leading slash
//http://localhost:8080/api/v1/user/register

const port = process.env.PORT || 8080; // Default to port 8080 if not set in .env
app.listen(port, () =>
  console.log(`Server is now running on http://localhost:${port}`)
);

const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
//Route's importation
const car = require("./routes/CarRoute");
const user = require("./routes/UserRoute");
app.use("/api/v2/", car);
app.use("/api/v2/",user);
app.use(ErrorHandler);

module.exports = app;

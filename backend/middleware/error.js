const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "interval server error";

  //wrong mongodb error
  if (err.name === "CastError") {
    const message = `Resources not found with this id..Invalid${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entred`;
    err = new ErrorHandler(message, 400);
  }
  // wrong jwt error
  if (err.name === "jasonWebTokenError") {
    const message = `your url is invalide please try again`;
    err = new ErrorHandler(message, 400);
  }

   // jwt expired error
   if (err.name === "TokenExpiredError") {
    const message = `your url is expired please try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

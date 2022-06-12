const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/Database");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server for handling uncaught Exception`)
})

//Config
dotenv.config({
  path: "backend/config/.env",
});

//connect data base
connectDatabase();


//Server creation
const server = app.listen(process.env.PORT, () => {
  console.log(`the server is running on http://localhost:${process.env.PORT}`);
});

//Unhundled promise rejection
process.on("unhandledRejection",(err)=>{
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection`);
  server.close(()=>{
    process.exit(1)
  });
});
const express = require("express");
const { default: mongoose } = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config(); //to load environment variables from an .env file.

const morgan = require("morgan");

const cors = require("cors");

const server = express();

const teacherRouter = require("./routes/teacherRoute");
const childRouter = require("./routes/childRouter");
const classRouter = require("./routes/classRouter");
const authenicatedRouter = require("./routes/authenticationRoute");
const { authorize } = require("./Middlewares/authenticationVW");
//handel error view in command
server.use(morgan("short"));
// Use the CORS middleware to allow cross-origin requests
server.use(cors());
// Calling the express.json() method for parsing
server.use(express.json());
server.use(bodyParser.json());
let port=process.env.PORT || 8080;

//open connection in database localhost 27017======================
mongoose.connect("mongodb://127.0.0.1:27017/nursingSystem")
  .then(() => {
    console.log(" start connected** ");
    server.listen(port, () => {

      console.log(" express listing.. .. .. .. .. ... ..");
    });
    console.log(" DB are connected    ***** ");
  })
  .catch((error) => {
    console.log("DB proplem# # # # #" + error);
  });
  // ==================================================
//enter to take token
// const connection = mongoose.connection;

server.use(authenicatedRouter); //give him the token in login
server.use(authorize); //check that have a token

server.use(teacherRouter);
server.use(classRouter);
server.use(childRouter);

server.use("/", function (req, res) {
  res.send("not ------> found ").status(404);
});

server.use((error, req, res, next) => {
  res.status(500).json({ error: error + "" });
});

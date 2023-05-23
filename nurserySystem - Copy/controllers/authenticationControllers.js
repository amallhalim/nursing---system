const { mongoose } = require("mongoose");
let bcrypt = require("bcrypt");

require("../models/teacherModel");
const Teacher = mongoose.model("teachers");

exports.login = (req, res, next) => {
  if (req.body.username == "admin" && req.body.password == "123") {
    // ================
    // console.log(res); // generate token
    var token;
    var jwt = require("jsonwebtoken"); //create token object

    token = jwt.sign(
      {
        password: req.body.password,
        username: "admin",
        role: "admin",

        id: 100,
      },
      process.env.secretKey,
      { expiresIn: "100h" }
    );
    res.status(200).json({ data: "ok", token });
    res.status(200).send({ data: "ok", token });
  } else {
    Teacher.find(
      { fullname: req.body.username },
      { password: 1, fullname: 1, _id: 1 }
    ).then((obj) => {
      // if no teacher with username was found
      if (obj === null) {
        let error = new Error("Not authenticated");
        error.status = 401;
        next(error);
      }
      //check password
      console.log(obj[0].password);
      console.log(req.body.password);
      bcrypt
        .compare(req.body.password, obj[0].password)
        .then((passwordsMatch) => {
          if (passwordsMatch) {
            console.log("Passwords match!");

            var token;
            var jwt = require("jsonwebtoken"); //create to
            token = jwt.sign(
              {
                username: obj.fullname,
                role: "teacher",
                id: obj._id,
              },
              process.env.secretKey,
              { expiresIn: "100h" }
            );
            res.status(200).json({ data: "ok", token });
          }
        })
        .catch((error) => {
          error = new Error("not authon__*__tication");
          error.status = 401;
          next(error);
        });
    });
  }
};

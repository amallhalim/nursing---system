let mongoose = require("mongoose");

require("../models/teacherModel");
require("../models/classModel");
const Teacher = mongoose.model("teachers");
const Class = mongoose.model("classes");
exports.getTeacherFunc = (req, res, next) => {
  Teacher.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
// ==========
let bcrypt = require("bcrypt");
// =====================
exports.postTeacherFunc = (req, res, next) => {
  let object = new Teacher({
    _id: req.body.id,
    fullname: req.body.fullname,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    image: req.body.image,
  });
  object
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteTeacherFunc = (req, res, next) => {
  Teacher.deleteOne({ _id: req.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error(" teacher not found to delete it ");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};

exports.updateTeacherFunc = (req, res, next) => {
  console.log(req.body);
  Teacher.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        image: req.body.image,
      },
    }
  )
    .then((data) => {
      console.log(data);
      if (data == null) {
        throw new Error(" teacher not found to update ");
      } else {
        res.json(data).status(200);
      }
    })
    .catch((error) => next(error));
};

exports.getTeacherBY_id_Func = (req, res, next) => {
  Teacher.findOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error(" teacher not found ");
      } else {
        res.json(data).status(200);
      }
    })
    .catch((error) => next(error));
};
exports.getTeacherBY_supervisor_Func = (req, res) => {
  // res.json("get from getTeacherBY_supervisor===");
  Class.find({}, { supervisor: 1, name: 1 })
    .populate({ path: "supervisor" })
    .then((teacher) => {
      res.json(teacher);
    })
    .catch((error) => next(error));
};

const mongoose = require("mongoose");
require("../models/classModel");
require("../models/teacherModel");
const Class = mongoose.model("classes");
const Teacher = mongoose.model("teachers");

exports.getClassFunc = (req, res, next) => {
  //children is name of property in schema not the name of collection
  Class.find({})
    .populate({ path: "children", select: "fullName" })
    // .populate("childs")
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

exports.postClassFunc = (req, res, next) => {
  const object = new Class({
    name: req.body.name,
    supervisor: req.body.supervisor,
    children: req.body.children,
  });
  object
    .save()
    .then((data) => {
      res.json(req.body);
    })
    .catch((error) => next(error));
};

exports.deleteClassFunc = (req, res, next) => {
  Class.deleteOne({ _id: req.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error("class its found to delete it");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};
exports.updateClassFunc = (req, res, next) => {
  Class.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name,
        supervisor: req.body.supervisor,
        children: req.body.children,
      },
    },
    { new: true } //method will return the updated document
  )
    .populate({ path: "children", select: "fullName" })
    .then((data) => {
      if (data == null) {
        throw new Error("class its found to update it");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};

exports.getClass_idFunc = (req, res) => {

  Class.findOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("not fpooo");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};

exports.getClass_id_teacher_Func = (req, res) => {
  // res.json("get from getClass_id_teacher_Fun1111111c");
  Class.find({ _id: req.params.id }, { name: 1 })
    // Teacher.find({}, { supervisor: 1 ,fullname:1})
    .populate({ path: "supervisor", select:{'fullname':1} })
    .then((teacher) => {
      res.json(teacher);
    })
};
exports.getClass_id_child_Func = (req, res) => {
  res.json("get from getClass_id_child_Func==    =");
};

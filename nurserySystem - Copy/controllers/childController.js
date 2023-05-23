const mongoose = require("mongoose");

require("../models/childModel");
const Child = mongoose.model("childs");

exports.getChildFunc = (req, res, next) => {
  console.log(res);

  Child.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
};

exports.postChildFunc = (req, res, next) => {
  const object = new Child({
    _id: req.body.id,
    fullName: req.body.fullName,
    level: req.body.level,
    address: req.body.address,
  });
  object
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
};
exports.deleteChildFunc = (req, res, next) => {
  Child.deleteOne({ _id: req.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error("class its found to delete it");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};
exports.updateChildFunc = (req, res, next) => {
  Child.findOneAndUpdate(
    { _id: req.body.id },
    {
      fullName: req.body.fullName,
      level: req.body.level,
      address: req.body.address,
    }
  )
    .then((data) => {
      console.log(data);
      if (data == null) {
        throw new Error("not found child to update it ");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};

exports.getChild_id_Func = (req, res, next) => {
  Child.find({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("not found child to update it ");
      } else {
        res.json(data);
      }
    })
    .catch((error) => next(error));
};
exports.getChild_id_class_Func = (req, res) => {
  res.json("get from getChild_id_class_Func");
};

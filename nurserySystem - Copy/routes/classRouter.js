const express = require("express");
const classcontroller = require("../controllers/classController");
const classMW = require("../Middlewares/classVM");
const validationMW = require("../Middlewares/validationMW");
const {
  isSupervisor,
  isTeacherORSupervisor,
} = require("../Middlewares/authenticationVW");

const Router = express.Router();

Router.route("/class")
  .all(isTeacherORSupervisor)
  .get(isSupervisor, classcontroller.getClassFunc)
  .post(classMW.postValidation(), validationMW, classcontroller.postClassFunc)
  .patch(
    classMW.updateValidation(),
    validationMW,
    classcontroller.updateClassFunc
  )
  .delete(
    classMW.getAndDELETE_Validation(),
    validationMW,
    classcontroller.deleteClassFunc
  );

Router.route("/class/:id/child")
  .all(isTeacherORSupervisor)
  .get(classcontroller.getClass_id_child_Func);
  Router.route("/class/:id/teacher").all(isTeacherORSupervisor)
  .get(classcontroller.getClass_id_teacher_Func);
Router.route("/class/:id").all(isTeacherORSupervisor)
.get(classcontroller.getClass_idFunc);

module.exports = Router;

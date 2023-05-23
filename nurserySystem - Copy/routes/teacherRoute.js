const express = require("express");
const teachercontroller = require("../controllers/teacherController");
const teacherVM = require("../Middlewares/teacherVM");
const validationMW = require("../Middlewares/validationMW");
const {
  isSupervisor,
  isTeacherORSupervisor,
} = require("../Middlewares/authenticationVW");

const multer = require("multer");
// const upload = multer({ dest: 'uploads/' }) //file wiche commog img save on it

const Router = express.Router();

// ==========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
    console.log(true);
  } else {
    // throw error if file type doesnot match
    cb(new Error("file type doesn't match"),false);
    // cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: filter,
});

// ==========================

Router.route("/teachers")
  .all(isSupervisor)
  .post(
    isSupervisor,
    upload.single("image"),
    teacherVM.postValidation(),
    validationMW,
    teachercontroller.postTeacherFunc
  )
  .get(isSupervisor, teachercontroller.getTeacherFunc)
  .patch(
    teacherVM.updateValidation(),
    validationMW,
    teachercontroller.updateTeacherFunc
  )
  .delete(
    teacherVM.getANDdeleeValidation(),
    validationMW,
    teachercontroller.deleteTeacherFunc
  );

Router.route("/teachers/supervise")
  .all(isSupervisor)
  .get(teachercontroller.getTeacherBY_supervisor_Func);

Router.route("/teachers/:id?")
  .all(isTeacherORSupervisor)
  .get(teachercontroller.getTeacherBY_id_Func);

module.exports = Router;

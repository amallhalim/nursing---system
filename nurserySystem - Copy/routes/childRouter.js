const express = require("express");
const childcontrller = require("../controllers/childController");
const childVali = require("../Middlewares/childVM");
const validationMW = require("../Middlewares/validationMW");
const { isSupervisor } = require("../Middlewares/authenticationVW");


const Router = express.Router();

Router.route("/child")

  .get(isSupervisor,childcontrller.getChildFunc)
  .post(childVali.POSTValidation(), validationMW, childcontrller.postChildFunc)
  .patch(
    childVali.updateValidation(),
    validationMW,
    childcontrller.updateChildFunc
  )
  .delete(
    childVali.GET_DELETE_Validation(),
    validationMW,
    childcontrller.deleteChildFunc
  );

Router.route("/child/:id").get(childcontrller.getChild_id_Func);

Router.route("/child/:id/class").get(childcontrller.getChild_id_class_Func);

module.exports = Router; 

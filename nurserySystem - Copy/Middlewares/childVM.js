const { body } = require("express-validator");

exports.POSTValidation = function () {
  return [
    body("id").isNumeric().optional().withMessage("enter number in id"),
    body("fullName")
      .isAlpha()
      .withMessage("enter string  in fullName"),
    body("age").isNumeric().optional().withMessage("enter number in age "),
    body("level")
      .isIn(["PreKG", "KG1", "KG2"])
      .withMessage("choice the suitable level "),
  ];
};
exports.updateValidation = function () {
  return [
    body("id").isNumeric().optional().withMessage("enter number in id"),
    body("fullName")
      .isAlpha()
      .optional()
      .withMessage("enter string  in fullName"),
    body("age").isNumeric().optional().withMessage("enter number in age "),
    body("level")
      .optional()
      .isIn(["PreKG", "KG1", "KG2"])
      .withMessage("choice the suitable level "),
  ];
};
exports.GET_DELETE_Validation = function () {
  return [body("id").isNumeric().withMessage("enter number")];
};

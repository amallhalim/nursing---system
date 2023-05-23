const { body } = require("express-validator");

exports.postValidation = function () {
  return [
    // body("id").isMongoId().withMessage("enter object id in id "),
    body("fullname").isAlpha().withMessage("enter string full name"),
    body("password").isString().withMessage("enter number in password"),
    body("email").isEmail().withMessage("enter sting in email"),
    // body("image").optional().isString().withMessage("enter string in image"),
  ];
};

exports.updateValidation = function () {
  return [
    body("id").optional().isMongoId().withMessage("enter object id in id "),
    body("fullname").optional().isAlpha().withMessage("enter string full name"),
    body("password")
      .optional()
      .isString()
      .withMessage("enter number in password"),
    body("email").optional().isEmail().withMessage("==enter sting in email"),
    // body("image").optional().isString().withMessage("enter string in image"),
  ];
};

exports.getANDdeleeValidation = function () {
  return [body("id").isMongoId().withMessage("enter number in id")];
};

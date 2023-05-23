const { body } = require("express-validator");

exports.postValidation = function () {
  return [
    body("name").optional().isAlpha().withMessage("enter string in name"),
    body("supervisor")
      .isString()
      .withMessage("enter sting in supervisor"),
    body("children")
      .isArray()
      .withMessage("enter array in children")

      .custom((value) => {
        if (!value.every(Number.isInteger))
          throw new Error("Array must contain Integers only");

        return true;
      }),
  ];
};
exports.updateValidation = function () {
  return [
    body("id").isNumeric().withMessage("enter number in id"),
    body("name").optional().isAlpha().withMessage("enter string in name"),
    body("supervisor")
      .optional()
      .isString()
      .withMessage("enter sting in supervisor"),
    body("children")
      .optional()
      .isArray()
      .withMessage("enter array in children")

      .custom((value) => {
        if (!value.every(Number.isInteger))
          throw new Error("Array must contain Integers only");

        return true;
      }),
  ];
};
exports.getAndDELETE_Validation = function () {
  return [body("id").isNumeric().withMessage("enter number in id")];
};

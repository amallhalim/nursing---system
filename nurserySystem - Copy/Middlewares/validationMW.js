const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let result = validationResult(request);
  console.log(result);
  if (result.errors.length != 0) {
    let errorstring = result.errors.reduce(
      (current, object) => current + object.msg,
      ""
    );
    let error = new Error(errorstring);
    error.status = 422;
    next(error);
  } else {
    next();
  }
};

const jwt = require("jsonwebtoken");

module.exports.authorize = (req, res, next) => {
  //check if had token   ==>//token are save inside the header
  let token;
  try {
    token = req.get("authorization").split(" ")[1];
    let decodetdToken = jwt.verify(token, process.env.secretKey);
    req.decodedObject = decodetdToken;
    console.log(decodetdToken);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.isSupervisor = (req, repsone, next) => {
  if (req.decodedObject.role == "admin") next();
  else {
    let error = new Error("not Authorized you are not admain");
    error.status = 403;
    next(error);
  }
};
module.exports.isTeacherORSupervisor = (req, repsone, next) => {
  if (req.decodedObject.role == "teacher" || req.decodedObject.role == "admin")
    next();
  else {
    let error = new Error("not Authorized you are not teacher or admin ");
    error.status = 403;
    next(error);
  }
};

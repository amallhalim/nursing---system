const mongoose = require("mongoose");

const schema = mongoose.Schema;

const teacherSchema = new schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  fullname: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  email: { type: String, unique: true },
  image: String,
});

// teacherSchema.index({ email: 1 }, { unique: true });
mongoose.model("teachers", teacherSchema);

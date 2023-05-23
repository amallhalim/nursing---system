const mongoose = require("mongoose");
const autoIncrement = require("@alec016/mongoose-autoincrement")
autoIncrement.initialize(mongoose.connection);

const schema = mongoose.Schema;

const classSchema = new schema({
  _id: Number,
  name: String,
  supervisor: {type:mongoose.Types.ObjectId,ref:"teachers"},
  // children: {Array}
  children:[ {type:Number,ref:"childs"}]
});

classSchema.plugin(autoIncrement.plugin, {
  model: 'classes',
  field: "_id",
  digits: 4,
  startAt: 1,
  incrementBy: 1,
  unique: true

});
// // model.exports=teacherSchema
// classSchema.plugin(autoIncrement.plugin, 'classes');

const  classes = mongoose.model("classes", classSchema);


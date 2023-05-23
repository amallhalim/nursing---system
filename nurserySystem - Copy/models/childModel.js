const mongoose = require("mongoose");
const autoIncrement = require("@alec016/mongoose-autoincrement")

autoIncrement.initialize(mongoose.connection);

const schema = mongoose.Schema;

const addressSechema = new schema({
city:{type:String ,required:true},
street:{type:String ,required:true},
building:{type:String ,required:true},
  },{_id:false});


const childSchema = new schema({
  _id: Number,
  fullName: String,
  level: {type:String,enum:["PreKG", "KG1", "KG2"]},
  address: {type:addressSechema},
});
childSchema.plugin(autoIncrement.plugin, {
  model: 'childs',
  field: "_id",
  digits: 4,
  startAt: 1,
  incrementBy: 1,
  unique: true

});
// autoIncrement.initialize(mongoose.connection);
// childSchema.plugin(autoIncrement.plugin, 'childs'); 

const childs =  mongoose.model("childs", childSchema);

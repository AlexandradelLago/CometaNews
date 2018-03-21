const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const profileSchema = new Schema({
 // birthday:{type:Date},
  sign: {type:String},
  account:{type:Schema.Types.ObjectId, ref:"user"},
  profilePic: {type: String, default: ''},
  quote:{type:String , default:''},
  news:{
    language :{type:String, default:''},
    category:{type:String,default :''},
    sources:{type:Array, default :''},
    country:{type:Array,default:''}
  }
});


module.exports = mongoose.model("Profile", profileSchema);


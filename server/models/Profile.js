const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const profileSchema = new Schema({
 // birthday:{type:Date},
  sign: {type:String},
  account:{type:Schema.Types.ObjectId, ref:"user"},
  profilePic: {type: String, default: 'https://cdn.onlinewebfonts.com/svg/img_264157.png'},
  quote:{type:String , default:'inspire'},
  news:{
    language :{type:String, default:'en'},
    category:{type:String,default :'general'},
    sources:{type:Array, default :''},
    country:{type:Array,default:'us'}
  }
});


module.exports = mongoose.model("Profile", profileSchema);


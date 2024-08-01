const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  macaddress:{
    type: String,
    default: "imthereforyou"
  },
  loggedin:{
    type: Boolean,
    default:false
  },
  loginfo:[]
  ,
  payment:[],
  

  accesstill:{
    type: Date,

  }
});

module.exports = mongoose.model("User", userSchema);

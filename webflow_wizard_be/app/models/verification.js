const mongoose = require("mongoose");

const log = new mongoose.Schema({
  ip: {
    type: String,
    maxlength: 255,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  macaddress: {
    type: String,
    required: true,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("Verification", log);

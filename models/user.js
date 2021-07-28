var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, index: { unique: true }
  },
  email: {
    type: String,
    required: true, index: { unique: true } 
  },
  password: {
    type: String,
    required: true 
  },
  active: { 
    type: Boolean, 
    default: false 
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

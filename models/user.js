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
  },
  vaccination_status: {
    type: String,
    required: true,
    default: 'unvaccinated'
  },
  fav_countries: []
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

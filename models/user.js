const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

/**
 * Method is used in routes/user.js
 * Calls functions defined by Moongoose
 */
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

/**
 * Method is used in routes/user.js
 * Calls functions defined by Moongoose
 */
module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

/**
 * Working: 10 rounds of salting and then hashed using HMAC SHA256 (by default). This can be changed too.
 * Method is used in routes/user.js
 * Calls functions defined by Moongoose
 */
module.exports.addUser = function(newUser, callback){
  console.log('****In add User***');
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      console.log('****saving user***');
      newUser.save(callback);
    });
  });
}

/**
 * Method is used in routes/user.js
 */
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

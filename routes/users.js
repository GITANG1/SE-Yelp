const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
var mongoose = require('mongoose');

router.post('/register', (req, res, next) => {
  mongoose.connect(config.database, 
    { server: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000 
        } 
    }
  );

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
    console.log("***Connected correctly to server");
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    /**
    * Method is exported from model/user.js
    */
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'}); 
      } else {
        res.json({success: true, msg:'User registered'});
      }
      console.log('**** CLOSING DB***');
      mongoose.disconnect();
    });   
  });
});

/**
 * Method is exported from model/user.js
*/
router.post('/authenticate', (req, res, next) => {
  mongoose.connect(config.database, 
    { server: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000 
        } 
    }
  );

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
    console.log("Connected correctly to server");
    console.log('**** IN Authenticate***');
    const username = req.body.username;
    const password = req.body.password;
    console.log('**** username = '+username);
    console.log('**** password = '+password);

    User.getUserByUsername(username, (err, user) => {
      console.log('*** getUserByUsername');
      if(err) throw err;
      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        console.log('*** comparePassword');
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({data: user}, config.secret); 

          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'}); 
        }
        console.log('*** diconnecting... ');
        mongoose.disconnect();
      });    
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => { 
  res.json({user: req.user});
});

module.exports = router;

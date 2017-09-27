const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  mongoose.connect(config.database, 
    { server: { 
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000 
        } 
    }
  );

  var db = mongoose.connection;
  //if error occurs on connection
  db.on('error', console.error.bind(console, 'connection error:'));
  //if error doesnt occur and database opens succesfully

  db.once('open', function () {
    console.log("Connected correctly to server");
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
    });
    db.close();
  });
});

/**
 * Method is exported from model/user.js
*/
router.post('/authenticate', (req, res, next) => {
  mongoose.connect(config.database, 
    { server: { 
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000 
        } 
    }
  );

  var db = mongoose.connection;
  //if error occurs on connection
  db.on('error', console.error.bind(console, 'connection error:'));
  //if error doesnt occur and database opens succesfully

  db.once('open', function () {
    console.log("Connected correctly to server");
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
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
      });    
    });
    db.close();
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => { 
  res.json({user: req.user});
});

module.exports = router;

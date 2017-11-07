const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

var elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

router.post('/register', (req, res, next) => {
    console.log(config.DB);
    console.log("register user");
    if(!(req.body.name && req.body.email && req.body.username && req.body.password))
        return res.json({ msg:'Failed to register user'});
    
    if(typeof req.body.name != "string" || typeof req.body.email!="string" || typeof req.body.username!="string" || typeof req.body.password!="string")
        return res.json({ msg:'Failed to register user'});
    
    var newUser = {
        "name": req.body.name,
        "email": req.body.email,
        "username": req.body.username,
        "password": req.body.password
    };

    addUser(newUser, (err, user) => {
        console.log('**** IN ADDUSER() *****');
        if (err) {
            console.log('**** IN ADDUSER().err *****');
            console.log(err);
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            console.log('**** IN ADDUSER().success *****');
            res.json({ success: true, msg: 'User registered' });
        }
    });   
});

/**
 * Method is exported from model/user.js
*/
router.post('/authenticate', (req, res, next) => {
  console.log('**** IN Authenticate***');
  if (!(req.body.username && req.body.password))
      return res.send('400', { error: 'User details expected. Expected : username, password' });
  if (typeof req.body.username != "string" || typeof req.body.password != "string")
      return res.send('400', { error: 'User details expected. Expected : username, password of type string' });
  var username = req.body.username;
  var password = req.body.password;
  console.log('**** username = ' + username);
  console.log('**** password = ' + password);

  getUserByUsername(username, (err, user) => {
      console.log('*** getUserByUsername');
      if (err)
          throw err;
      if (!user) {
          res.json({ success: false, msg: 'User not found' });
          return;
      }

      comparePassword(password, user._source.password, (err, isMatch) => {
          console.log('*** comparePassword');
          if (err) {
              console.log("Error found in compare password - bcrypt");
          }
          if (isMatch) {
              const token = jwt.sign({ data: user }, config.secret);

              console.log("User recognised");
              res.json({
                  success: true,
                  token: 'JWT ' + token,
                  user: {
                      id: user._id,
                      name: user._source.name,
                      username: user._source.username,
                      email: user._source.email
                  }
              });
          } else {
              res.json({ success: false, msg: 'Wrong password' });
          }
      });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => { 
  res.json({user: req.user});
});

//helper functions
const bcrypt = require('bcryptjs');

function getUserByUsername(username, callback) {
    var query = {
        "query": {
            "match": {
                "username": username
            }
        }
    };
    
    client.search({
        index: config.DB,
        type: 'users',
        body: query
    }, function(error, response){
      callback(error,response.hits.hits[0]);
  });
}

function addUser(newUser, callback) {
    var query = {
        "query": {
            "match": {
                "username": newUser.username
            }
        }
    };
    client.search({
        index: config.DB,
        type: 'users',
        body: query
    }, (error, response) => {
        console.log('----- res = ' + JSON.stringify(response));
        if(error)
          throw error;
        var res=response.hits.hits;
        console.log("");
        console.log("???????????");
        console.log("***************"+JSON.stringify(res));
        if (res[0]!=null || res[0]!=undefined) {
            callback(new Error("User already exists!"));
        }
        else {
            console.log('****In add User***');
           
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    console.log('****saving user***');
                    client.index({
                        index: config.DB,
                        type: 'users',
                        body: newUser
                      }, callback);
                });
            });
        }

    });
}

function comparePassword(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            console.log("-----------------------------");
            console.log(err);
            console.log("-----------------------------");
            callback(err, false);
        }
        callback(null, isMatch);
    });
}

module.exports = router;

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

/**
 * Updates the user with the name and email provided.
 * If the password field is empty previous password is retained otherwise the password is updated with the new password
 *
 * @section users
 * @type put
 * 
 * @url /users/update
 * 
 * @param {string} id 
 * @param {string} name
 * @param {string} email
 * @param {string=} password
 */

router.put('/update', (req, res, next) => {
    if (!(req.body.id && req.body.name && req.body.email))
        return res.json({ msg: 'Failed to update user' });

    console.log(req.body.name);
    var hashedPassword;
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                hashedPassword = hash;
                console.log('****saving user***');
                var script = "ctx._source.name=\"" + String(req.body.name) + "\"; ctx._source.email=\"" + String(req.body.email) + "\"; ctx._source.password=\"" + String(hashedPassword) + "\";";
                updateUser(req.body.id, script, res);
            });

        });
    }

    else {
        var script = "ctx._source.name=\"" + String(req.body.name) + "\"; ctx._source.email=\"" + String(req.body.email) + "\";";
        updateUser(req.body.id, script, res);
    }

});

/**
 * Registers the user with the provided details
 *
 * @section users
 * @type post
 * 
 * @url /users/register
 * 
 * @param {string} username 
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */

router.post('/register', (req, res, next) => {
    console.log(config.DB);
    console.log("register user");
    if (!(req.body.name && req.body.email && req.body.username && req.body.password))
        return res.json({ msg: 'Failed to register user' });

    if (typeof req.body.name != "string" || typeof req.body.email != "string" || typeof req.body.username != "string" || typeof req.body.password != "string")
        return res.json({ msg: 'Failed to register user' });

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
 * Authenticates the user if correct username and password combination is provided
 * If username doesnt exists then user not found error message is provided
 * If password is wrong then wrong found error message is provided
 *
 * @section users
 * @type post
 * 
 * @url /users/authenticate
 * 
 * @param {string} username 
 * @param {string} password
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
    }, function (error, response) {
        callback(error, response.hits.hits[0]);
    });
}

function getUserById(id, callback) {
    var query = {
        "query": {
            "match": {
                "_id": id
            }
        }
    };

    client.search({
        index: config.DB,
        type: 'users',
        body: query
    }, function (error, response) {
        callback(error, response.hits.hits[0]);
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
        if (error)
            throw error;
        var res = response.hits.hits;
        console.log("");
        console.log("???????????");
        console.log("***************" + JSON.stringify(res));
        if (res[0] != null || res[0] != undefined) {
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

function updateUser(id, script, res) {
    getUserById(id, (err, user) => {
        console.log('*** getUserById');
        if (err) {
            res.status(500)
                .send("Error");
            return;
        }
        if (!user) {
            res.json({ success: false, msg: 'User not found' });
            return;
        }

        client.update({
            index: config.DB,
            type: 'users',
            id: id,
            body: {
                script: script,
            }
        }, function (error, response) {
            if (error) {
                console.log(error);
                res.status(500)
                    .send("Error inserting the profile changes in the database");
                return;
            }
            res.status(201)
                .send("User updated successfully!");

        });
    });
}

module.exports = router;

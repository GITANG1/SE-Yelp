var mongoose = require('mongoose');
assert = require('assert');

var express = require('express');
var router = express.Router();
var config = require('../config/database');
var Restaurants = require('../models/restaurantSchema');

router.get('/', function(req, res, next){
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
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log("Connected correctly to server");
        // create a new dish
        Restaurants.create({
            name: 'Monty da Dhabba',
            address:'3800 SW 34th St',
            city:'Tampa',
            state:'Florida',
            timing:[{
                open:800,
                close: 2200
            }],
            phone:3695556789,
            expense_level:1,
            rating:5,
            menu:[{
                name:'Paneer Kadhai',
                description:'Zindagi ka Pyaar'
            },
            {
                name:'Achari Bhindi Masala',
                description:'Khushiyon ki Bahaar'
            },
            {
                name:'Lassi',
                description:'Gale ko rahat'
            },
            {
                name:'Masala Papad',
                description:'Lassi ke saath aa jaye mazaa'
            },
            {
                name:'Chicken Tikka',
                description:'Kyun de rhe ho bechare chicken ko sazaa'
            }]        
        }, function (err, restaurant) {
            if (err) throw err;
            console.log('Restaurant created!');
            console.log(restaurant);
            // get all the dishes
            db.close();
            res.send('Restaurant Added!');
        });
    });
});

module.exports=router;
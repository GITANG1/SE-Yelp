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
            name: "Taco House",
            address: "4295 W Navy Blvd, Pensacola, FL 32507",
            city: "Pensacola",
            state: "FL",
            timing:[{
                open:800,close: 2200
            }],
            phone: 8509124430,
            expense_level: 3,
            rating: 3,
            menu:[{
                 name:'Burrito',
                 description:'Stuffed with meat, cheese, rice, beans and sauce. Then smothered with extra sauce and cheese.'
             },
             {
                 name:'Taco',
                 description:'Filled with meat, cheese, lettuce and pico de gallo. Served with cilantro lime rice and choice of beans'
             },
             {
                 name:'Nachos',
                 description:'Loaded with meat, queso, beans, sour cream, pico de gallo and guacamole.'
             },
             {
                 name:'Salads',
                 description:'Loaded with meat, rice, beans, lettuce, pico de gallo, guacamole, tortilla strips, cotija cheese and dressing. DRESSINGS: Tomatillo Ranch, Cilantro Lime Vinaigrette, Sweet Mango'
             },
             {
                 name:'Quesadillas',
                 description:'Filled with meat and cheese. Served with cilantro lime rice and choice of beans.'
             },
             {
                 name:'Enchiladas',
                 description:'Stuffed with meat, cheese and sauce. Served with cilantro lime rice, and choice of beans. SAUCES: Roasted Green Chile, Tomatillo Cilantro, Red Enchilada'
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
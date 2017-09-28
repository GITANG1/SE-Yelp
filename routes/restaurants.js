var express = require('express');
var restaurantRouter = express.Router();

var bodyParser = require('body-parser');

var listRouter = express.Router();
var searchRouter = express.Router();
var restIDRouter = express.Router();

listRouter.use(bodyParser.json());
searchRouter.use(bodyParser.json());
restIDRouter.use(bodyParser.json());

restaurantRouter.use('/list',listRouter);
restaurantRouter.use('/search',searchRouter);
restaurantRouter.use('/restID',restIDRouter);

const config = require('../config/database');
var mongoose = require('mongoose');

assert = require('assert');
var Restaurants = require('../models/restaurantSchema');


//when nothing is specified, send an error message
restaurantRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('Invalid Route\n The valid routes are: \n1.Restaurant/List\n2.Restaurant/Search\n3.Restaurant/restID/:restID');
    });

//when list of all restaurants is requested
listRouter.route('/')
    .get(function(req,res){
        console.log("User requested LISTING of all restaurants for suggestions purpose");
        //make connection to the database
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

            //query the database for list of all restaurants
            var query=Restaurants.find();
            query.select('name city');
            query.exec(function (err, rest) {
                //callback
                if (err) throw err;
                console.log("List of Restaurants that is sent to client : ");
                console.log(rest);
                res.json(rest);
                //db.close();
                mongoose.disconnect();
              });            
        });
    
});


searchRouter.route('/')
.get(function(req,res){
    console.log("User requested LISTING of all restaurants for suggestions purpose");
    //make connection to the database
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

        //query the database for list of all restaurants
        var query=Restaurants.find({$text : { $search : "Pizza Hut" }},{ score : { $meta: "textScore" } });
        query.sort({ score : { $meta : 'textScore' } });
        query.select('name city');
        query.exec(function (err, rest) {
            //callback
            if (err) throw err;
            console.log("List of Restaurants that is sent to client : ");
            console.log(rest);
            res.json(rest);
            db.close();
            //mongoose.disconnect();
          });            
    });

})
.post(function(req,res){
    console.log("\n\nRequest body :\n"+req.body+"\n\n");
    var searchString=req.body.search;
    console.log("User requested LISTING of restaurants : "+searchString);
    //make connection to the database
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

        //query the database for list of all restaurants
        var query=Restaurants.find({$text : { $search : searchString }},{ score : { $meta: "textScore" } });
        query.sort({ score : { $meta : 'textScore' } });
        query.select('name city');
        query.exec(function (err, rest) {
            //callback
            if (err) throw err;
            console.log("List of Restaurants that is sent to client : ");
            console.log(rest);
            res.json(rest);
            db.close();
            //mongoose.disconnect();
          });            
    });

});

module.exports = restaurantRouter;

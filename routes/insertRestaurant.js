var mongoose = require('mongoose');
assert = require('assert');

var express = require('express');
var router = express.Router();
var config = require('../config/database');
var Restaurants = require('../models/restaurantSchema');

jsonArray=[];
addData();


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
        Restaurants.create(jsonArray
        , function (err, restaurant) {
            if (err) throw err;
            console.log('Restaurant created!');
            console.log(restaurant);
            // get all the dishes
            db.close();
            res.send('Restaurant Added!');
        });
    });
});

function addData(){
    jsonArray[0]={
        name: 'Taco House',
        address:'4295 W Navy Blvd, Pensacola, FL 32507',
        city:'Pensacola',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509124430,
        expense_level:3,
        rating:3,
        menu:[{
            name:'veggie burrito',
            description:''
        },
        {
            name:'chicken burrito',
            description:''
        }],
        cuisine:'Mexican'
    };

    jsonArray[1]={
        name: 'Hot Dog Shoppe',
        address:'1308 N Ferdon Blvd, Crestview, FL 32536-1714',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509124430,
        expense_level:3,
        rating:3,
        menu:[{
            name:'hot dog',
            description:''
        }],
        cuisine:'Fast Food'
    };

    jsonArray[2]={
        name: 'Hungry Howie\'s Pizza',
        address:'610 N Navy Blvd, Pensacola, FL 32507-1208',
        city:'Pensacola',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503062272,
        expense_level:2,
        rating:2,
        menu:[{
            name:'veggie Pizza',
            description:''
        },
        {
        name:'chicken Pizza',
        description:'' 
        },
        {
            name:'Margarita Pizza',
            description:'cheese'
        }],
        cuisine:'Pizza'
    };

    jsonArray[3]={
        name: 'Burger King',
        address:'8480 N Century Blvd, Century, FL 32535',
        city:'Century',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8502563555,
        expense_level:2,
        rating:2,
        menu:[{
            name:'veggie Burger',
            description:''
        },
        {
        name:'chicken Burger',
        description:'' 
        },
        {
            name:'Margarita Burger',
            description:'cheese'
        }],
        cuisine:'American'
    };

    jsonArray[4]={
        name: 'Subway',
        address:'1090 N Ferdon Blvd, Ste C, Crestview, FL 32536',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503986162,
        expense_level:3,
        rating:3,
        menu:[{
            name:'veggie subway sandwich',
            description:''
        },
        {
        name:'chicken subway sandwich',
        description:'' 
        },
        {
            name:'cheese subway sandwich',
            description:'cheese'
        }],
        cuisine:'American'
    };

    jsonArray[5]={
        name: 'Scrap\'s Suds & Grub Sports Bar',
        address:'148 E Woodruff Ave, Suite C, Crestview, FL 32536-3502',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503062272,
        expense_level:3,
        rating:3,
        menu:[{
            name:'veggie sandwich',
            description:''
        },
        {
        name:'chicken sandwich',
        description:'' 
        },
        {
            name:'cheese sandwich',
            description:'cheese'
        }],
        cuisine:'American'
    };

    jsonArray[6]={
        name: 'Wings Of Fire',
        address:'397 E James Lee Blvd, Crestview, FL',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503062272,
        expense_level:2,
        rating:2,
        menu:[{
            name:'chicken wings',
            description:''
        },
        {
        name:'chicken nuggests',
        description:'' 
        },
        {
            name:'steak',
            description:''
        }],
        cuisine:'American'
    };

    jsonArray[7]={
        name: 'Sully\'s Place',
        address:'4895 Lillian Hwy, Pensacola, FL 32506-6441',
        city:'Pensacola',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503062272,
        expense_level:4,
        rating:4,
        menu:[{
            name:'french fries',
            description:''
        },
        {
        name:'nacho chips',
        description:'' 
        }],
        cuisine:'Pub'
    };

    jsonArray[8]={
        name: 'China Star',
        address:'1334 N Ferdon Blvd, Crestview, FL 32536',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8503062272,
        expense_level:2,
        rating:2,
        menu:[{
            name:'dumplings momos',
            description:''
        },
        {
        name:'fried rice',
        description:'' 
        }],
        cuisine:'Chinese'
    };

    jsonArray[9]={
        name: 'D & W Cafe',
        address:'584 N Ferdon Blvd, Crestview, FL',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509685525,
        expense_level:5,
        rating:5,
        menu:[{
            name:'latte',
            description:''
        },
        {
        name:'mocha',
        description:'' 
        }],
        cuisine:'American'
    };

    jsonArray[10]={
        name: 'Chic-Fil-A',
        address:'Hwy 90 West, Pace, FL',
        city:'Pace',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509685556,
        expense_level:4,
        rating:4,
        menu:[{
            name:'chicken nuggets',
            description:''
        },
        {
        name:'chicken burger',
        description:'' 
        }],
        cuisine:'American'
    };

    jsonArray[11]={
        name: 'Emerald Isle Seafood Restaurant & Market',
        address:'1260 S Ferdon Blvd, Crestview, FL 32536',
        city:'Crestview',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509685556,
        expense_level:3,
        rating:3,
        menu:[{
            name:'shrimp',
            description:''
        },
        {
        name:'fish curry',
        description:'' 
        },
        {
            name:'prawns',
            description:''
        }],
        cuisine:'Seafood'
    };

    jsonArray[12]={
        name: 'Lil Della\'s New Mexican Restaurant',
        address:'424 N Highway 29, Cantonment, FL 32533',
        city:'Cantonment',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509685556,
        expense_level:5,
        rating:5,
        menu:[{
            name:'burrito',
            description:''
        },
        {
        name:'enchilada',
        description:'' 
        },
        {
            name:'quesadilla',
            description:''
        }],
        cuisine:'Mexican'
    };

    //fourteenth
    jsonArray[13]={
        name: 'Subway',
        address:'4600 Mobile Hwy, Ste 110, Pensacola, FL 32506',
        city:'Pensacola',
        state:'Florida',
        timing:[{
            open:800,
            close: 2200
        }],
        phone:8509685556,
        expense_level:2,
        rating:2,
        menu:[{
            name:'veggie subway sandwich',
            description:''
        },
        {
        name:'chicken subway sandwich',
        description:'' 
        },
        {
            name:'cheese subway sandwich',
            description:'cheese'
        }],
        cuisine:'American'
    };
}

module.exports=router;

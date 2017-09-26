var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;


//dishes_schema.plugin(textSearch);

// add a text index to the tags array
//dishes_schema.index({ name: 'text' });


var dishes_schema=new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
});

var timing_schema=new Schema({
    open:{
        type: Number,
        required: true
    },
    close:{
        type:Number,
        required: true
    }
})

var restaurant_schema=new Schema({
    name:{
        type: String,
        required: true,
        index:true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required : true
    },
    state:{
        type: String,
        required: true
    },
    timing:[timing_schema],
    phone:{
        type: Number,
        required: true
    },
    expense_level:{
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    menu:[dishes_schema]
});

//restaurant_schema.plugin(textSearch);
restaurant_schema.index({
    name :"text"
}, {
    name: "restaurant_search_index",
    weights: {
        name : 5
    }
});

//restaurant_schema.index({ name: 'text' });

//make a model of this schema to be used
var Restaurant = mongoose.model('restaurants', restaurant_schema);

//export this model to make this available to our Node applications
module.exports = Restaurant;
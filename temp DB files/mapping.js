var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

//declare variables for making requests and adding new mapping
var request = require('request');

var mapping = {
  "mappings": {
    "restaurants": {
      "properties": {
        "restaurant_name": {
          "type": "text",
        },
        "city": {
          "type": "keyword"
        },
        "menu": {
          "type": "text"
        },
        "location": {
          "type": "geo_point"
        },
        "tags": {
          "type": "keyword"
        },
        "imageUrl": {
          "type": "keyword"
        },
        "rating": {
          "type": "float"
        }
      }
    },
    "users":{
      "properties":{
        "name":{
          type:"text"
        },
        "email":{
          type:"keyword"
        },
        "username":{
          type:"keyword"
        },
        "password":{
          type:"keyword"
        }
      }
    }
  }
};



request({ url: "http://localhost:9200/gulp", method: 'DELETE' }, function (error, response, body) {
    console.log("in delete phase");
    
      if (!error) {
        console.log("-------------------------");
        console.log(body);
        console.log('Previous index gulp was deleted');
      }
      else {
        console.log('error' + error);
      }
      
      //if succesfully deleted, add new mapping
      request({ url: "http://localhost:9200/gulp", method: 'PUT', json: mapping }, function (error, response, body) {
        if (!error) {
          console.log("-------------------------");
          console.log(body);
          console.log('new Index gulp with new mapping added');
        }
        else {
          console.log('error: ' + error);
        }
      });
    });


var request = require('request');
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

/*
var usermapping = {
  "mappings": {
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

var restaurantmapping = {
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
    }
  }
};

var checkinmapping = {
  "mappings": {
    "checkin": {
      "properties": {
        "restaurant": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "user": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "date": {
          type: "keyword"
        }
      }
    }
  }
};*/

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
        "menuUrl": {
          "type": "keyword"
        },
        "rating": {
          "properties": {
            "total": { "type": "float" },
            "number": { "type": "integer" },
            "value": { "type": "float" }
          }
        },
        "address": {
          "type": "keyword"
        },
        "phoneNo": {
          "type": "keyword"
        },
        "costInfo": {
          "type": "keyword"
        },
        "cuisine": {
          "type": "keyword"
        },
        "website": {
          "type": "keyword"
        }
      }
    },
    "users": {
      "properties": {
        "name": {
          type: "keyword"
        },
        "email": {
          type: "keyword"
        },
        "username": {
          type: "keyword"
        },
        "password": {
          type: "keyword"
        },
      }
    },
    "ratings": {
      "properties": {
        "restaurant": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "user": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "value": {
          type: "float"
        },
        "review": {
          type: "keyword"
        }
      }
    },
    "checkin": {
      "properties": {
        "restaurant": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "user": {
          "properties": {
            "id": { type: "keyword" },
            "name": { type: "keyword" }
          }
        },
        "date": {
          type: "keyword"
        }
      }
    }
  }
};

request({ url: "http://localhost:9200/gulptest", method: 'DELETE' }, function (error, response, body) {
  console.log("in delete phase");

  if (!error) {
    console.log("-------------------------");
    console.log(body);
    console.log('Previous index gulp test was deleted');
  }
  else {
    console.log('error' + error);
  }

  //if succesfully deleted, add new mapping
  request({ url: "http://localhost:9200/gulptest", method: 'PUT', json: mapping }, function (error, response, body) {
    if (!error) {
      console.log("-------------------------");
      console.log(body);
      console.log('new Index gulp test with new mapping added');
    }
    else {
      console.log('error: ' + error);
    }
  });
});

      /*
      request({ url: "http://localhost:9200/gulptest", method: 'DELETE' }, function (error, response, body) {
        console.log("in delete phase");
        
          if (!error) {
            console.log("-------------------------");
            console.log(body);
            console.log('Previous index gulp test was deleted');
          }
          else {
            console.log('error' + error);
          }
          
          //if succesfully deleted, add new mapping
          request({ url: "http://localhost:9200/gulptest", method: 'PUT', json: checkinmapping }, function (error, response, body) {
            if (!error) {
              console.log("-------------------------");
              console.log(body);
              console.log('new Index gulp test with new mapping added');
            }
            else {
              console.log('error: ' + error);
            }
          });
        });

        
        request({ url: "http://localhost:9200/gulptest", method: 'DELETE' }, function (error, response, body) {
          console.log("in delete phase");
          
            if (!error) {
              console.log("-------------------------");
              console.log(body);
              console.log('Previous index gulp test was deleted');
            }
            else {
              console.log('error' + error);
            }
            
            //if succesfully deleted, add new mapping
            request({ url: "http://localhost:9200/gulptest", method: 'PUT', json: restaurantmapping }, function (error, response, body) {
              if (!error) {
                console.log("-------------------------");
                console.log(body);
                console.log('new Index gulp test with new mapping added');
              }
              else {
                console.log('error: ' + error);
              }
            });
          });*/
          
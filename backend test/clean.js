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
  
    request({ url: "http://localhost:9200/gulpusertest", method: 'DELETE' }, function (error, response, body) {
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
        request({ url: "http://localhost:9200/gulpusertest", method: 'PUT', json: usermapping }, function (error, response, body) {
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
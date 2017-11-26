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

//adding data to insert into array
var bulkBody=[];

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:1
    }
});
bulkBody.push({
    name:"blaze pizza",
    city:"gainesville",
    menu:["veggie pizza", "chicken pizza"],
    location:"29.62170, -82.37230",
    tags: ["breakfast", "lunch", "dinner"],
    imageUrl:"img1",
    menuUrl:"img01",
    rating:{
        "total": 25,
        "number":  5,
        "value": 5
    },
    address:"3800 sw 34th st, gainesville",
    phoneNo:"(352) 834 5894",
    costInfo: "$$",
    cuisine: "Fast food/ American",
    website: "www.pizzahut.com"
});


bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:2
    }
});
bulkBody.push({
    name:"pizza hut",
    city:"gainesville",
    menu:["veggie pizza", "chicken pizza"],
    location:"29.655272, -82.420424",
    tags: ["breakfast", "lunch", "dinner","take out", "delivery"],
    imageUrl:"img2",
    menuUrl:"img01",
    rating:{
        "total": 20,
        "number":  5,
        "value": 4
    },
    address:"3802 sw 34th st, gainesville",
    phoneNo:"(352) 834 5894",
    costInfo: "$$",
    cuisine: "Fast food/ American",
    website: "www.pizzahut.com"
});


bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:3
    }
});
bulkBody.push({
    name:"Burger King",
    city:"gainesville",
    menu:["veggie burger", "chicken burger"],
    location:"29.617976, -82.383637",
    tags: ["breakfast", "lunch", "dinner", "nightlife"],
    imageUrl:"img3",
    menuUrl:"img01",
    rating:{
        "total": 15,
        "number":  5,
        "value": 3
    },
    address:"3803 sw 34th st, gainesville",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Fast food/ American",
    website: "www.burgerking.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:4
    }
});
bulkBody.push({
    name:"pizza hut - orlando",
    city:"orlando",
    menu:["veggie pizza", "chicken pizza"],
    location:"28.538336, -81.379234",
    tags: ["breakfast", "lunch", "dinner","take out", "delivery"],
    imageUrl:"img4",
    menuUrl:"img01",
    rating:{
        "total": 10,
        "number":  5,
        "value": 2
    },
    address:"3804 sw 34th st, gainesville",
    phoneNo:"(352) 834 5894",
    costInfo: "$$$",
    cuisine: "Fast food/ American",
    website: "www.pizzahut.com"
});
//insert array into elasticsearch database
client.bulk({body:bulkBody}, function(error, response){
    if(error)
        console.log(error);
    else{
        console.log("------------------------------");
        console.log(response);
        console.log("------------------------------");

        client.search({
            index: 'gulp',
            type: 'restaurants',
          }, function(error, response){
            // ...
            if(error)
                console.log(error);
            else
                console.log("------------------------------");
                console.log(response);
                console.log("------------------------------");
          });
    }
});
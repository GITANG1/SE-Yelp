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
        _index:"gulptest",
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
    rating:4
});

bulkBody.push({
    index:{
        _index:"gulptest",
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
    rating:4.5
});

bulkBody.push({
    index:{
        _index:"gulptest",
        _type:"restaurants",
        _id:3
    }
});
bulkBody.push({
    name:"Burger King",
    city:"gainesville",
    menu:["veggie burger", "chicken burger", "cheese pizza"],
    location:"29.617976, -82.383637",
    tags: ["breakfast", "lunch", "dinner", "nightlife"],
    imageUrl:"img3",
    rating:3.5
});

bulkBody.push({
    index:{
        _index:"gulptest",
        _type:"restaurants",
        _id:4
    }
});
bulkBody.push({
    name:"Pizza world",
    city:"gainesville",
    menu:["veggie delight", "chicken delight"],
    location:"29.627976, -82.363637",
    tags: ["breakfast", "lunch", "dinner", "nightlife"],
    imageUrl:"img4",
    rating:3.5
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
            index: 'gulptest',
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
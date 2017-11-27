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
    imageUrl:["images/1/1.jpg","images/1/2.jpg","images/1/3.jpg"],
    menuUrl:"images/1/menu.jpg",
    logoUrl:"images/1/logo.png",
    hours: "10 AM to 10 PM",
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
    imageUrl:["images/2/1.jpg","images/2/2.jpg","images/2/3.jpg"],
    menuUrl:"images/2/menu.jpg",
    logoUrl:"images/2/logo.png",
    hours: "10 AM to 10 PM",
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
    imageUrl:["images/3/1.jpg","images/3/2.jpg","images/3/3.jpg"],
    menuUrl:"images/3/menu.jpg",
    logoUrl:"images/3/logo.png",
    hours: "10 AM to 10 PM",
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
    imageUrl:["images/2/1.jpg","images/2/2.jpg","images/2/3.jpg"],
    menuUrl:"images/2/menu.jpg",
    logoUrl:"images/2/logo.png",
    hours: "10 AM to 10 PM",
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

//gainesville
bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:5
    }
});
bulkBody.push({
    name:"The Spot",
    city:"Gainesville",
    menu:["the gyro", "spanikopita", "greek salad"],
    location:"29.6526250, -82.3464950",
    tags: ["breakfast", "lunch", "dinner","take out", "nightlife"],
    imageUrl:["images/5/1.jpg","images/5/2.jpg","images/5/3.jpg"],
    menuUrl:"images/5/menu.jpg",
    logoUrl:"images/5/logo.jpg",
    hours: "10 AM to 10 PM",
    rating:{
        "total": 22,
        "number":  5,
        "value": 4.4
    },
    address:"16 NW 18th St Gainesville, FL 32603",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Greek, Sandwiches, Mediterranean",
    website: "www.thespotgainesville.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:6
    }
});
bulkBody.push({
    name:"Maple Street Biscuit Company",
    city:"Gainesville",
    menu:["the five", "the sticky maple", "the farmer", "the blt"],
    location:"29.6198490, -82.3815160",
    tags: ["breakfast", "lunch", "dinner"],
    imageUrl:["images/6/1.jpg","images/6/2.jpg","images/6/3.jpg"],
    menuUrl:"images/6/menu.jpg",
    logoUrl:"images/6/logo.jpg",
    hours: "10 AM to 10 PM",
    rating:{
        "total": 24,
        "number":  5,
        "value": 4.8
    },
    address:"3904 SW Archer Rd Gainesville, FL 32608",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Breakfast & Brunch, Sandwiches",
    website: "www.maplestreetbiscuits.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:7
    }
});
bulkBody.push({
    name:"Metro Diner",
    city:"Gainesville",
    menu:["zuccini fries", "mom's omlete", "greek omlete", "chicken biscuit sandwich"],
    location:"29.6326500, -82.3731890",
    tags: ["breakfast", "lunch", "dinner", "nightlife"],
    imageUrl:["images/7/1.jpg","images/7/2.jpg","images/7/3.jpg"],
    menuUrl:"images/7/menu.jpg",
    logoUrl:"images/7/logo.png",
    hours: "10 AM to 10 PM",
    rating:{
        "total": 21,
        "number":  5,
        "value": 4.2
    },
    address:"2132 SW 34th St Gainesville, FL 32608",
    phoneNo:"(352) 834 5894",
    costInfo: "$$$",
    cuisine: "Diners, Breakfast & Brunch, American (Traditional)",
    website: "www.metrodiner.com"
});

//orlando
bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:8
    }
});
bulkBody.push({
    name:"The smoothie room",
    city:"Orlando",
    menu:["berry dose", "papaya love", "yellow fever"],
    location:"28.5152260, -81.3776900",
    tags: ["breakfast", "lunch", "take out"],
    imageUrl:["images/8/1.jpg","images/8/2.jpg","images/8/3.jpg"],
    menuUrl:"images/8/menu.jpg",
    logoUrl:"images/8/logo.png",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 20,
        "number":  5,
        "value": 4
    },
    address:"25 W Crystal Lake St, Orlando, FL 32806",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Juice Bars & Smoothies, Live/Raw Food, Vegan",
    website: "www.thesmoothieroom.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:9
    }
});
bulkBody.push({
    name:"Dixie Dharma",
    city:"Orlando",
    menu:["The Orangebird", "Carolina BBQ Pulled Jackfruit", "Florida Fried Green Tomato"],
    location:"28.5152260, -81.3776900",
    tags: ["breakfast", "lunch", "dinner", "take out", "delivery"],
    imageUrl:["images/9/1.jpg","images/9/2.jpg","images/9/3.jpg"],
    menuUrl:"images/9/menu.jpg",
    logoUrl:"images/9/logo.png",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 20,
        "number":  5,
        "value": 4
    },
    address:"2603 E S S, Market On S, Orlando, FL 32803",
    phoneNo:"(352) 834 5894",
    costInfo: "$$",
    cuisine: "Vegan, Southern, Vegetarian",
    website: "www.dixiedharma.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:10
    }
});
bulkBody.push({
    name:"Oudom Thai & Sushi",
    city:"Orlando",
    menu:["Lemongrass Snapper, shrimp and scallops", "Shrimp nigiri sashimi", "Basil Garlic Seared Ahi Tuna", "Crispy Spring Rolls"],
    location:"28.5409390, -81.3704420",
    tags: ["breakfast", "lunch", "dinner", "take out", "delivery", "nightlife"],
    imageUrl:["images/10/1.jpg","images/10/2.jpg","images/10/3.jpg"],
    menuUrl:"images/10/menu.jpg",
    logoUrl:"images/10/logo.jpg",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 22,
        "number":  5,
        "value": 4.4
    },
    address:"100 S Eola Dr, Ste 105, Orlando, FL 32801",
    phoneNo:"(352) 834 5894",
    costInfo: "$$",
    cuisine: "Sushi Bars, Thai, Seafood",
    website: "www.oudomsthaiandsushi.webs.com"
});

//ocala
bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:11
    }
});
bulkBody.push({
    name:"Cafe Havana",
    city:"Ocala",
    menu:["Capuccino", "Papa rellena", "Enchilada", "Burrito"],
    location:"29.1961480, -82.1361360",
    tags: ["breakfast", "lunch", "dinner", "take out"],
    imageUrl:["images/11/1.jpg","images/11/2.jpg","images/11/3.jpg"],
    menuUrl:"images/11/menu.jpg",
    logoUrl:"images/11/logo.png",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 20,
        "number":  5,
        "value": 4
    },
    address:"923 N Magnolia Ave, Ste 300, Ocala, FL 34475",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Cuban",
    website: "www.cafehavanaocala.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:12
    }
});
bulkBody.push({
    name:"La Hacienda",
    city:"Ocala",
    menu:["tacos", "Enchilada", "Burrito"],
    location:"29.1868080, -82.1910040",
    tags: ["breakfast", "lunch", "dinner", "take out"],
    imageUrl:["images/12/1.jpg","images/12/2.jpg","images/12/3.jpg"],
    menuUrl:"images/12/menu.jpg",
    logoUrl:"images/12/logo.png",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 18,
        "number":  5,
        "value": 3.6
    },
    address:"4185 W Hwy 40, Ocala, FL 34482",
    phoneNo:"(352) 834 5894",
    costInfo: "$",
    cuisine: "Mexican, Grocery",
    website: "www.lahaciendaocala.com"
});

bulkBody.push({
    index:{
        _index:"gulp",
        _type:"restaurants",
        _id:13
    }
});
bulkBody.push({
    name:"Amrit Palace",
    city:"Ocala",
    menu:["panner tikka", "butter chicken", "chicken tikka"],
    location:"29.1557670, -82.1801230",
    tags: ["breakfast", "lunch", "dinner", "take out", "delivery", "nightlife"],
    imageUrl:["images/13/1.jpg","images/13/2.jpg","images/13/3.jpg"],
    menuUrl:"images/13/menu.jpg",
    logoUrl:"images/13/logo.png",
    hours: "10 AM to 5 PM",
    rating:{
        "total": 24,
        "number":  5,
        "value": 4.8
    },
    address:"3415 SW College Rd Ocala, FL 34474",
    phoneNo:"(352) 834 5894",
    costInfo: "$$$",
    cuisine: "Indian",
    website: "www.amritpalace.com"
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
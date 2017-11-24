var express = require('express');
var restaurantRouter = express.Router();

var bodyParser = require('body-parser');

var listRouter = express.Router();
var searchRouter = express.Router();
var restIDRouter = express.Router();
var searchByLocationRouter = express.Router();
var searchByTagRouter = express.Router();

listRouter.use(bodyParser.json());
searchRouter.use(bodyParser.json());
restIDRouter.use(bodyParser.json());
searchByLocationRouter.use(bodyParser.json());
searchByTagRouter.use(bodyParser.json());

restaurantRouter.use('/list', listRouter);
restaurantRouter.use('/search', searchRouter);
restaurantRouter.use('/searchByLocation', searchByLocationRouter);
restaurantRouter.use('/restID', restIDRouter);
restaurantRouter.use('/searchByTag', searchByTagRouter);
assert = require('assert');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const config = require('../config/database');

restaurantRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('Invalid Route\n The valid routes are: \n1.Restaurant/List\n2.Restaurant/Search\n3.Restaurant/restID/:restID');
    });

listRouter.route('/')
    .get(function (req, res) {
        console.log("User requested LISTING of all restaurants for suggestions purpose");

        var listQuery = {
            "query": {
                "match_all": {}
            }
        }
        search(listQuery, {}, res);
    });

searchRouter.route('/')
    .post(function (req, res) {

        if (req.body.hasOwnProperty("search") && req.body.hasOwnProperty("city")) {
            var searchString = req.body.search;
            var city = req.body.city;
            console.log("User requested LISTING of restaurants : " + searchString + " and city : " + city);

            var searchByCityQuery = {
                "query": {
                    "bool": {
                        "must": [{
                            "term": {
                                "city": city
                            }
                        },
                        {
                            "multi_match": {
                                "query": searchString,
                                "fields": ["name^10", "menu"]
                            }
                        }
                        ],
                        "should": [
                            {
                                "multi_match": {
                                    "query": searchString,
                                    "fields": ["name^10", "menu"]
                                }
                            }
                        ]
                    }
                },
                "sort": {
                    "_score": {
                        "order": "desc"
                    }
                }
            };
            search(searchByCityQuery, {}, res);
        }
        else {
            res.status(400);
            res.json({ error: "Expected variables not found. Expected variables : search, city" });
        }
    });

searchByLocationRouter.route('/')
    .post(function (req, res) {

        console.log("\n\nRequest body :\n" + req.body + "\n\n");

        if (req.body.hasOwnProperty("search") && req.body.hasOwnProperty("location")) {
            var searchString = req.body.search;
            var location = req.body.location;
            try {
                var ss = location.split(",");
                var lat = parseFloat(ss[0]);
                var lon = parseFloat(ss[1]);
            }
            catch (err) {
                return res.send('400', { error: 'Location field not of expected type. Expected : /"number, number/"' });
            }
            console.log("User requested LISTING of restaurants : " + searchString + " and location : " + location);

            var searchByLocationQuery = {
                "query": {
                    "bool": {
                        "should": [
                            {
                                "multi_match": {
                                    "query": searchString,
                                    "fields": ["name^10", "menu"]
                                }
                            }
                        ],
                        "filter": {
                            "geo_distance": {
                                "distance": "20km",
                                "location": {
                                    "lat": lat,
                                    "lon": lon
                                }
                            }
                        }
                    }
                }
            };
            search(searchByLocationQuery, { "lat": lat, "lon": lon }, res);
        }
        else {
            res.status(400);
            res.json({ error: "Expected variables not found. Expected variables : search, location" });
        }

    });

restIDRouter.route('/:restId')
    .get(function (req, res) {
        var query = {
            "query": {
                "terms": {
                    "_id": [req.params.restId]
                }
            }
        };
        search(query, {}, res);
    });

searchByTagRouter.route('/')
    .post(function (req, res) {
        console.log("User requested searching by tag");

        if (!(req.body.hasOwnProperty("tag") && req.body.hasOwnProperty("city")))
            return res.send('400', { error: 'Search details expected. Expected : tag, city' });

        if (typeof req.body.tag != "string" || typeof req.body.city != "string")
            return res.send('400', { error: 'Search details expected. Expected : tag, city of type string' });

        var city = req.body.city;
        var tag = req.body.tag;
        var searchByTagQuery = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "city": city
                            }
                        },
                        {
                            "term": {
                                "tags": tag
                            }
                        }
                    ]
                }
            },
            "sort": {
                "rating": {
                    "order": "desc"
                }
            }
        };
        search(searchByTagQuery, {}, res);
    });

function search(query, point, res) {
    client.search({
        index: config.DB,
        type: 'restaurants',
        body: query
    }, function (error, response) {
        // ...
        if (error) {
            console.log("ERROR IS: ----------------------------------------------");
            console.log(error);
            res.status(500);
            res.json(error);
        }
        else {
            console.log("------------------------------");
            if (response.hits.hits) {
                console.log(JSON.stringify(response.hits.hits));
                //if search by location, then add distance parameter to the result
                if (point.hasOwnProperty(lat)) {
                    var resBody = [];
                    for (var k = 0; k < response.hits.hits.length; k++) {

                        var loc = response.hits.hits[k]._source.location;
                        var ss = loc.split(",");
                        var lat = parseFloat(ss[0]);
                        var lon = parseFloat(ss[1]);
                        var dist = distance(point.lat, point.lon, lat, lon);

                        var x = response.hits.hits[k];
                        x.distance = dist;
                        resBody.push(x);
                    }
                    res.status(200);
                    res.json(resBody);
                }
                else {
                    res.status(200);
                    res.json(response.hits.hits);
                }
            }
            else {
                res.status(500);
                res.json("Error occured");
            }
            console.log("------------------------------");
        }
    });
}

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}

module.exports = restaurantRouter;

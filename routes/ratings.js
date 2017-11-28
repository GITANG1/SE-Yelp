var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

const config = require('../config/database');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


/**
 * Returns all the ratings of the restaurant with id 'restId'
 * restId is specified in the URL
 *
 * @section rating
 * 
 * @type get
 * 
 * @url /ratings/:restId
 * 
 */
router.route('/:restId')
    .get(function (req, res) {
        var restId = req.params.restId;

        var query = {
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "restaurant.id": restId
                        }
                    }
                }
            }
        };

        client.search({
            index: config.DB,
            type: 'ratings',
            body: query
        }, function (error, response) {
            if (error) {
                console.log("ERROR IS: ----------------------------------------------");
                console.log(error);

                res.status(500).send("error querying database for ratings");
                return;
            }
            else {
                console.log("successfully queried database for ratings for restaurant");
                if (response.hits.hits) {
                    console.log(JSON.stringify(response.hits.hits));

                    res.status(200);
                    res.json(response.hits.hits);
                }
            }
        });

    });



/**
 * Returns all the ratings entered by the user with id 'userId'
 * userId is specified in the URL
 *
 * @section rating
 * 
 * @type get
 * 
 * @url /ratings/byUser/:userId
 * 
 */
router.route('/byUser/:userId')
    .get(function (req, res) {
        var userId = req.params.userId;

        var query = {
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "user.id": userId
                        }
                    }
                }
            }
        };

        client.search({
            index: config.DB,
            type: 'ratings',
            body: query
        }, function (error, response) {
            if (error) {
                console.log("ERROR IS: ----------------------------------------------");
                console.log(error);

                res.status(500).send("error querying database for ratings");
                return;
            }
            else {
                console.log("successfully queried database for ratings for user");
                if (response.hits.hits) {
                    console.log(JSON.stringify(response.hits.hits));

                    res.status(200);
                    res.json(response.hits.hits);
                }
            }
        });

    });


/**
 * Add the rating for the restaurant in the database
 * 
 * @section rating
 * 
 * @type post
 * 
 * @url /ratings
 * 
 * @param {JSON} restaurant 
 * @param {JSON} user
 * @param {String} restaurant.name
 * @param {String} restaurant.logoUrl
 * @param {String} restaurant.id
 * @param {String} user.id
 *  @param {String} user.name
 * @param {Float} value
 */
router.route('/')
    .post(function (req, res) {

        if (req.body.hasOwnProperty("restaurant") && req.body.restaurant.hasOwnProperty("id")
            && req.body.restaurant.hasOwnProperty("name") && req.body.restaurant.hasOwnProperty("logoUrl")
            && req.body.hasOwnProperty("user") && req.body.user.hasOwnProperty("id")
            && req.body.user.hasOwnProperty("name") && req.body.hasOwnProperty("value")) {

            var script = "ctx._source.rating.total +=" + req.body.value +
                "; ctx._source.rating.number++; ctx._source.rating.value=(ctx._source.rating.total*1.0/ctx._source.rating.number);";
            client.index({
                index: config.DB,
                type: 'ratings',
                body: req.body
            }, function (error, response) {
                if (error) {
                    console.log(error);
                    res.status(500)
                        .send("Error inserting the ratings into database");
                    return;
                }
                console.log("ratings added");
                client.update({
                    index: config.DB,
                    type: 'restaurants',
                    id: req.body.restaurant.id,
                    body: {
                        script: script,
                    }
                }, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.status(500)
                            .send("Error inserting the ratings changes into restaurants in the database");
                        return;
                    }
                    res.status(201)
                        .send("rating added");
                    return;
                });
            });
        }
        else {
            res.status(400)
                .send("Invalid ratings object in request body");
        }
    });

router.route('/:ratingId')
    .delete(function (req, res) {
        var id = req.params.ratingId;

        //first search if this is valid rating id
        client.get({
            index: config.DB,
            type: 'ratings',
            id: id
        }, function (error, response) {
            if (error) {
                console.log("---------------------------");
                console.log("ERROR");
                console.log("---------------------------");

                res.status(500).send("Unkown error occured with database");
                return;
            }
            if (!response.hasOwnProperty("_source")) {
                console.log("---------------------------");
                console.og("User rerquested rating that does not exist");
                console.log("---------------------------");

                res.status(400).send("Rating with this ID does not exist");
                return;
            }

            var rating = response._source;
            var script = "ctx._source.rating.total -=" + rating.value + "; ctx._source.rating.number--; ctx._source.rating.value=(ctx._source.rating.total*1.0/ctx._source.rating.number);";
            client.delete({
                index: config.DB,
                type: 'ratings',
                id: id
            }, function (error, response) {
                if (error) {
                    console.log("---------------------------");
                    console.log("ERROR");
                    console.log("---------------------------");

                    res.status(500).send("Unkown error occured with database while deleting rating");
                    return;
                }

                client.update({
                    index: 'gulp',
                    type: 'restaurants',
                    id: rating.restaurant.id,
                    body: {
                        script: script,
                    }
                }, function (error, response) {
                    if (error) {
                        console.log("---------------------------");
                        console.log("ERROR");
                        console.log("---------------------------");

                        res.status(500).send("Unkown error occured with database while updating restaurant");
                        return;
                    }

                    res.status(200).send("deleted successfully");
                });
            });
        });
    });

module.exports = router;

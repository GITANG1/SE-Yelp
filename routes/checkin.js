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


router.route('/:restId/:userId')
    .get(function (req, res) {

        var restId = req.params.restId;
        var userId = req.params.userId;

        var query = {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "restaurant.id": restId } },
                        { "match": { "user.id": userId } }
                    ]
                }
            }
        };

        client.search({
            index: config.DB,
            type: 'checkin',
            body: query
        }, function (error, response) {
            if (error) {
                console.log("ERROR IS: ----------------------------------------------");
                console.log(error);

                res.status(500).send("error querying database for checkin");
                return;
            }
            else {
                console.log("successfully queried database for checkin for user at restaurant");
                if (response.hits.hits[0]) {
                    console.log(JSON.stringify(response.hits.hits));
                    //checkin exists
                    res.status(200);
                    res.json("1");
                }
                else {
                    //checkin does not exist
                    res.status(200);
                    res.json("0");
                }
            }
        });

    });

router.route('/:userId')
    .get(function (req, res) {

        var userId = req.params.userId;

        var query = {
            "query": {
                "bool": {
                    "must":
                    { "match": { "user.id": userId } }
                }
            }
        };

        client.search({
            index: config.DB,
            type: 'checkin',
            body: query
        }, function (error, response) {
            if (error) {
                console.log("ERROR IS: ----------------------------------------------");
                console.log(error);

                res.status(500).send("error querying database for checkin");
                return;
            }
            else {
                console.log("successfully queried database for checkin for user");
                console.log(response.hits.hits);
                if (response.hits.hits[0]) {
                    console.log(JSON.stringify(response.hits.hits));
                    //checkin exists
                    res.status(200);
                    res.json(response.hits.hits);
                }
                else {
                    //checkin does not exist
                    res.status(200);
                    res.json([]);
                }
            }
        });

    });

router.route('/')
    .post(function (req, res) {

        if (!(req.body.hasOwnProperty("restaurant") && req.body.restaurant.hasOwnProperty("id")
            && req.body.restaurant.hasOwnProperty("name") && req.body.restaurant.hasOwnProperty("logoUrl")
            && req.body.hasOwnProperty("user") && req.body.user.hasOwnProperty("id"))) {
            res.status(400).send("Invalid checkin object in request body");
            return;
        }

        var checkin = req.body;
        var dt = new Date();
        var date = ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + '/' + (((dt.getMonth() + 1) < 10) ? '0' : '') + (dt.getMonth() + 1) + '/' + dt.getFullYear();
        checkin["date"] = date;
        console.log(checkin);
        client.index({
            index: config.DB,
            type: 'checkin',
            body: checkin
        }, function (error, response) {
            if (error) {
                res.status(500).send("Unkown error while inserting into database");
                return;
            }
            res.status(200).send("Checkin inserted");
        });

    });



module.exports = router;

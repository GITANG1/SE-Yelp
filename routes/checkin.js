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
                        { "match": { "restId": restId } },
                        { "match": { "userId": userId } }
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
                    res.send("1");
                }
                else {
                    //checkin does not exist
                    res.status(200);
                    res.send("0");
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
                        { "match": { "userId": userId } }
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

router.route('/:restId/:userId')
    .post(function (req, res) {

        var restId = req.params.restId;
        var userId = req.params.userId;

        var body = {
            "restId": restId,
            "userId": userId
        };

        client.index({
            index: config.DB,
            type: 'checkin',
            body: body
        }, function (error, response) {
            if (error) {
                res.status(500).send("Unkown error while inserting into database");
                return;
            }
            res.status(200).send("Checkin inserted");
        });

    });


    
module.exports = router;

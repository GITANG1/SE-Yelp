const chai = require('chai');
var expect = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');
var sleep = require('system-sleep');
var should = require('should');

//for two users first and second, a rating is added for the restaurant pizza hut. First user also enters rating for Metro Diner restaurant
describe(' Add rating router tests for user and restaurants', function () {
    this.timeout(7000);
    
    before(function (done) {
        addRatings(function () {

            done();

        });

    });


    it('should display the ratings posted for restaurant pizza hut', function (done) {
        chai.request('http://localhost:3000/ratings/2')
            .get('/')
            .end(function (err, res) {
                res.should.be.json;
                res.body.length.should.equal(2);

                res.body[0]._source.should.have.property('restaurant');
                res.body[0]._source.should.have.property('user');
                res.body[0]._source.restaurant.id.should.equal(2);
                res.body[0]._source.restaurant.name.should.equal('pizza hut');

                res.body[1]._source.should.have.property('restaurant');
                res.body[1]._source.should.have.property('user');
                res.body[1]._source.restaurant.id.should.equal(2);
                res.body[1]._source.restaurant.name.should.equal('pizza hut');
                if (res.body[0]._source.user.id == 'first') {
                    res.body[0]._source.value.should.equal(7);
                    res.body[1]._source.value.should.equal(3);
                }

                else {
                    res.body[1]._source.value.should.equal(7);
                    res.body[0]._source.value.should.equal(3);
                }

                done();
            });
    });

    it('should update the total cumulating rating value for the restaurant pizza hut', function (done) {

        chai.request('http://localhost:3000/restaurants/restID/2')
            .get('/')
            .end(function (err, res) {
                res.should.be.json;

                res.body[0]._source.rating.total.should.equal(28);
                res.body[0]._source.rating.number.should.equal(7);
                res.body[0]._source.rating.value.should.equal(4);

                done();
            });
    });

    it('should display all ratings posted by user with "first" user id', function (done) {
        chai.request('http://localhost:3000/ratings/byUser/first')
            .get('/')
            .end(function (err, res) {
                res.body.length.should.equal(2);

                res.body[0]._source.user.id.should.equal("first");
                res.body[1]._source.user.id.should.equal("first");

                if (res.body[0]._source.restaurant.id == 2) {
                    res.body[0]._source.restaurant.name.should.equal('pizza hut');
                    res.body[0]._source.value.should.equal(7);

                    res.body[1]._source.restaurant.name.should.equal('Metro Diner');
                    res.body[1]._source.value.should.equal(5);
                }
                else {
                    res.body[0]._source.restaurant.name.should.equal('Metro Diner');
                    res.body[0]._source.value.should.equal(5);

                    res.body[1]._source.restaurant.name.should.equal('pizza hut');
                    res.body[1]._source.value.should.equal(7);
                }


                done();
            });
    });
});

function addRatings(done) {

    chai
        .request('http://localhost:3000/ratings')
        .post('/')
        .send({
            "restaurant": {
                "id": 2,
                "name": "pizza hut",
                "logoUrl": "test.png"
            },
            "user": {
                "id": "first",
                "name": "first"
            },
            "value": 7
        })
        .end(function (error, response, body) {
            if (error) {
                throw error;
            } else {
                chai
                    .request('http://localhost:3000/ratings')
                    .post('/')
                    .send({
                        "restaurant": {
                            "id": 2,
                            "name": "pizza hut",
                            "logoUrl": "test.png"
                        },
                        "user": {
                            "id": "second",
                            "name": "second"
                        },
                        "value": 3
                    })
                    .end(function (error, response, body) {
                        if (error) {
                            throw error;
                        } else {
                            chai
                                .request('http://localhost:3000/ratings')
                                .post('/')
                                .send({
                                    "restaurant": {
                                        "id": 7,
                                        "name": "Metro Diner",
                                        "logoUrl": "test.png"
                                    },
                                    "user": {
                                        "id": "first",
                                        "name": "first"
                                    },
                                    "value": 5
                                })
                                .end(function (error, response, body) {
                                    if (error) {
                                        throw error;
                                    } else {
                                        sleep(1300);
                                        done();
                                    }
                                });
                        }
                    });
            }
        })
}


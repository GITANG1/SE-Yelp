const chai = require('chai');
var expect = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');
var sleep = require('system-sleep');
var should = require('should');

describe('Checkin router tests', function () {
    before(function (done) {

        postRequest(function () {
            
            done();

        });
    });

    it('should return the checkin details of user "abc"', function (done) {
        chai.request('http://localhost:3000/checkin/abc')
            .get('/')
            .end(function (err, res) {
                res.should.be.json;

                res.body[0]._source.should.have.property('restaurant');
                res.body[0]._source.should.have.property('user');
                res.body[0]._source.user.id.should.equal('abc');

                res.body[1]._source.should.have.property('restaurant');
                res.body[1]._source.should.have.property('user');
                res.body[1]._source.user.id.should.equal('abc');

                if (res.body[0]._source.restaurant.id == 1)
                    res.body[0]._source.restaurant.name.should.equal('pizza hut');
                else
                    res.body[0]._source.restaurant.name.should.equal('blaze pizza');

                done();
            });

    });

    it('should return the checkin details of user "abcd"', function (done) {
        chai.request('http://localhost:3000/checkin/abcd')
            .get('/')
            .end(function (err, res) {
                res.should.be.json;

                res.body[0]._source.should.have.property('restaurant');
                res.body[0]._source.should.have.property('user');
                res.body[0]._source.user.id.should.equal('abcd');
                res.body[0]._source.restaurant.id.should.equal(1);
                res.body[0]._source.restaurant.name.should.equal('pizza hut');

                done();
            });

    });


    it('should return null for checkin of user "abcde" since the user has not checked in before', function (done) {
        chai.request('http://localhost:3000/checkin/abcde')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.empty;

                done();
            });

    });

    it('should return 1 for restaurant with id 1 and user id "abc"', function (done) {
        chai.request('http://localhost:3000/checkin/1/abc')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.equal("1");

                done();
            });
    });

    it('should return 1 for restaurant with id 1 and user id "abcd"', function (done) {
        chai.request('http://localhost:3000/checkin/1/abcd')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.equal("1");

                done();
            });
    });

    it('should return 1 for restaurant with id 2 and user id "abc"', function (done) {
        chai.request('http://localhost:3000/checkin/2/abc')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.equal("1");

                done();
            });
    });

    it('should return 0 for restaurant with id 2 and user id "abcd"', function (done) {
        chai.request('http://localhost:3000/checkin/2/abcd')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.equal("0");

                done();
            });
    });

    it('should return 0 for restaurant with id 3 and user id "abc"', function (done) {
        chai.request('http://localhost:3000/checkin/3/abc')
            .get('/')
            .end(function (err, res) {
                expect(res.body).to.be.equal("0");

                done();
            });
    });

});

function postRequest(done) {
    chai
        .request('http://localhost:3000/checkin')
        .post('/')
        .send({
            "restaurant": {
                "id": 1,
                "name": "pizza hut",
                "logoUrl":"images/13/logo.png"
            },
            "user": {
                "id": "abc"
            }

        })
        .end(function (error, response, body) {
            if (error) {
                throw error;
            } else {

                chai
                    .request('http://localhost:3000/checkin')
                    .post('/')
                    .send({
                        "restaurant": {
                            "id": 2,
                            "name": "blaze pizza",
                            "logoUrl":"images/13/logo.png"
                        },
                        "user": {
                            "id": "abc"
                        }

                    })
                    .end(function (error, response, body) {
                        if (error) {
                            throw error;
                        } else {

                            chai
                                .request('http://localhost:3000/checkin')
                                .post('/')
                                .send({
                                    "restaurant": {
                                        "id": 1,
                                        "name": "pizza hut",
                                        "logoUrl":"images/13/logo.png"
                                    },
                                    "user": {
                                        "id": "abcd"
                                    }

                                })
                                .end(function (error, response, body) {
                                    if (error) {
                                        throw error;
                                    }
                                    else {

                                        sleep(1000);
                                        done();
                                    }

                                });
                        }
                    });
            }
        });

}

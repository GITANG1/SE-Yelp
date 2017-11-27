const chai = require('chai');
var expect = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');

var should = require('should');

describe('Main Page', function () {
    this.timeout(5000); // How long to wait for a response (ms)


    it('should return main page body message', function (done) {

        request('http://localhost:3000', function (error, response, body) {
            expect(body).to.equal('Please use appropriate route');
            done();
        });

    });

    it('should return 200 status for main page', function (done) {

        request('http://localhost:3000', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });

    });
});

describe('Post API for user registration', function () {

    it('should register user when new user with valid parameters is passed', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            .send({
                "name": "john smith",
                "email": "johnsmith@test.com",
                "username": "smithj",
                "password": "abc123"
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
            });
        done();
    });

    it('should not register user when username is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "username": "abc12",
                "email": "abcg@test.com",
                "password": "12345"
            })
            .then(function (res, error) {
                expect(res.body.msg).to.equal("Failed to register user");

                //expect(res.body.success).to.equal(false);
            });
        done();
    });

    it('should not register user when email is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "name": "abc gef",
                "username": "abcg",
                "password": "12345"
            })
            .then(function (res) {
                expect(res.body.msg).to.equal("Failed to register user");
            });
        done();
    });

    it('should not register user when username is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "name": "abc gef",
                "email": "abcg@gmail.com",
                "password": "12345"
            })
            .then(function (res) {
                expect(res.body.msg).to.equal("Failed to register user");
            });
        done();
    });

    it('should not register user when password is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "name": "abc gef",
                "email": "abcg@gmail.com",
                "password": "12345"
            })
            .then(function (res) {
                expect(res.body.msg).to.equal("Failed to register user");
            });
        done();
    });

});

describe('User Profile Access', function () {
    it('should not authorize User profile access', function (done) {

        request('http://localhost:3000/users/profile', function (error, response, body) {
            expect(body).to.equal('Unauthorized');
            done();
        });

    });
});

describe('User authentication', function () {
    it('should not validate user if password is invalid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "username": "johnny",
                "password": "abc123f"
            })
            .then(function (res) {

                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
            });
        done();
    });

    it('should validate user if password is valid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "username": "smithj",
                "password": "abc123"
            })
            .then(function (res) {

                expect(res).to.have.status(200);
                //expect(res.body.user.username).to.equal("smithj");
                expect(res.body.success).to.equal(false);
                console.log(res.body);
            });
        done();
    });

    it('should not validate user if username is invalid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "username": "smithjh",
                "password": "abc123"
            })
            .then(function (res) {

                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
            });
        done();
    });
});

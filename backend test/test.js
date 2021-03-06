const chai = require('chai');
var expect = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');
var sleep = require('system-sleep');
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
                expect(res).to.have.status(201);
                expect(res.body.success).to.equal(true);
            });
        done();
    });

    it('should not register user when username is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            .send({
                "username": "abc12",
                "email": "abcg@test.com",
                "password": "12345"
            })
            .then(function (res, error) {
                expect(res.body.msg).to.equal("Failed to register user");

            });
        done();
    });

    it('should not register user when email is missing in user registration request', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
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



describe('User authentication', function () {
    this.timeout(7000);
    before(function (done) {
        registerUser(function () {

            done();

        });
    });

    it('should not validate user if password is invalid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            .send({
                "username": "admin",
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
            .send({
                "username": "useradmin",
                "password": "abc123"
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.user.username).to.equal("useradmin");
                expect(res.body.success).to.equal(true);

            });
        done();
    });

    it('should not validate user if username is invalid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            .send({
                "username": "admin",
                "password": "abc123"
            })
            .then(function (res) {

                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
            });
        done();
    });
});

describe('User authentication after users details are updated', function () {
    this.timeout(5000);
    before(function (done) {
        registerForUpdateUser(function () {

            UpdateUser(function () {
                done();
            });


        });
    });

    it('should not validate user if password is invalid', function () {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            .send({
                "username": "adhiraj",
                "password": "abc123"
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
            .send({
                "username": "adhiraj",
                "password": "abc123n"
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.user.username).to.equal("adhiraj");
                expect(res.body.success).to.equal(true);

            });
        done();
    });


});

function registerUser(done) {
    chai
        .request('http://localhost:3000')
        .post('/users/register')
        .send({
            "name": "admin admin",
            "username": "useradmin",
            "email": "admin@test.com",
            "password": "abc123"

        })
        .end(function (error, response, body) {
            if (error) {
                throw error;
            } else {
                sleep(1200);
                done();
            }
        });
}

function registerForUpdateUser(done) {

    chai
        .request('http://localhost:3000')
        .post('/users/register')
        .send({
            "name": "adhiraj nakhe",
            "username": "adhiraj",
            "email": "adhiraj@test.com",
            "password": "abc123"

        })
        .end(function (error, response, body) {
            if (error) {
                throw error;
            } else {
                sleep(1200);
                done();
            }
        });
}

function UpdateUser(done) {
    var userId;
    chai
        .request('http://localhost:3000/users')
        .post('/authenticate')
        .send({
            "username": "adhiraj",
            "password": "abc123"

        })
        .end(function (error, response, body) {
            if (error) {
                throw error;
            } else {

                userId = response.body.user.id;
                chai
                    .request('http://localhost:3000')
                    .put('/users/update')
                    .send({
                        "id": String(userId),
                        "email": "adhiraj@test.com",
                        "name": "adhiraj nakhe",
                        "password": "abc123n"

                    })
                    .end(function (error, response, body) {
                        if (error) {
                            throw error;
                        } else {

                            sleep(1200);
                            done();
                        }
                    });
            }
        });

}

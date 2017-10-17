const chai = require('chai');
var expect  = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');

var utils = require('./utils.js');
var should = require('should');
// import our User mongoose model
const User = require('../models/user');

describe('Main Page', function() {
    this.timeout(5000); // How long to wait for a response (ms)
  

it('should return main page body message', function(done) {
   
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.equal('Please use appropriate route');
        done();
    });       
        
});

it('should return 200 status for main page', function(done) {
    
     request('http://localhost:3000' , function(error, response, body) {
         expect(response.statusCode).to.equal(200);
         done();
     });       
         
 });
});

 describe('Post API for user registration',function(){
    it('should register user when new user with valid parameters is passed', function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "name":"john smith",
                "email":"johnsmith@test.com",
                "username":"johnnysm",
                "password":"abc123"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
              });
    });

    it('should send a post request when new user with valid parameters is passed', function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "name":"jon snow",
                "email":"jonsnow@test.com",
                "username":"johnnysm",
                "password":"abc123s"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
              });
    });

    it('should not register user when username is missing in user registration request', function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "name":"abc",
                "email":"abcg@test.com",
                "password":"12345"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
              });
    });

    it('should not register user when one email is missing in user registration request', function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "name":"abc gef",      
                "username":"abcg",
                "password":"12345"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
              });
    });


    describe('User Profile Access',function(){
    it('should not authorize User profile access', function(done) {
        
         request('http://localhost:3000/users/profile' , function(error, response, body) {
             expect(body).to.equal('Unauthorized');
             done();
         });       
             
     });
    });

    describe('User authentication',function(){
    it('should not return wrong passwrod user if password is invalid',function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "username":"johnny",
                "password":"abc123f"
            })
            .then(function(res) {
                
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
              });
    });  
    
    it('should validate user if password is invalid',function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "username":"johnny",
                "password":"abc123"
            })
            .then(function(res) {

                expect(res).to.have.status(200);
                expect(res.body.user.username).to.equal("johnny");
                
              });
    });  
    
    it('should return invalid username if username invalid',function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/authenticate')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "username":"john",
                "password":"abc123"
            })
            .then(function(res) {
                
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(false);
              });
    }); 
    
    

    });

   
    
    
    
    
    
      describe('Create user', function () {
        it('should create a new user in database', function (done) {
          // Create a User object to pass to User.create()
          var u = {
            name: 'abc',
            email: 'ddd',
            username: 'v',
            password: 'c'
             
          };
          User.create(u, function (err, createdUser) {
            // Confirm that that an error does not exist
            should.not.exist(err);
            // verify that the returned user is what we expect
            createdUser.name.should.equal('abc');
            createdUser.password.should.equal('c');
            // Call done to tell mocha that we are done with this test
            done();
          });
        });
      });
    
    
    
    
 });




const chai = require('chai');
var expect  = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');

describe('Main Page', function() {
    this.timeout(5000); // How long to wait for a response (ms)
  

it('Main page body', function(done) {
   
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.equal('Please use appropriate route');
        done();
    });       
        
});

it('Main page status', function(done) {
    
     request('http://localhost:3000' , function(error, response, body) {
         expect(response.statusCode).to.equal(200);
         done();
     });       
         
 });
});

 describe('post',function(){
    it('should send a post request when valid parameters are passed', function() {
        return chai
            .request('http://localhost:3000')
            .post('/users/register')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "name":"john smith",
                "email":"johnsmith@test.com",
                "username":"johnny",
                "password":"abc123"
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
              });
    });

    it('should throw an error when one parameter is missing in post request', function() {
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

    it('should throw an error when one parameter is missing in post request', function() {
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
    describe('User Profile',function(){
    it('User profile access should be unauthorized', function(done) {
        
         request('http://localhost:3000/users/profile' , function(error, response, body) {
             expect(body).to.equal('Unauthorized');
             done();
         });       
             
     });
    });

    describe('User authentication',function(){
    it('password invalid',function() {
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
    
    it('Username and password valid',function() {
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
    
    it('username invalid',function() {
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
    
 });




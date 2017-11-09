const chai = require('chai');
var expect  = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');

var should = require('should');

describe('search By Tag',function(){

    it('should return restaurant which contain breakfast menus and are located in gainesville', function() {
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/searchByTag')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "tag":"breakfast",
                "city":"gainesville",
            })
            .then(function(res) {
                var i;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal("gainesville");
                    var j;
                    var status = false;
                    for(j = 0; j < res.body[i]._source.tags.length; j++){
                        if(res.body[i]._source.tags[j] == "breakfast")
                            status = true;
                    }
                    expect(status).to.equal(true);
                }

              });
              done();
    });

    it('should return restaurant which satisfy nightlife constraint and are located in gainesville', function() {
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/searchByTag')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "tag":"nightlife",
                "city":"gainesville",
            })
            .then(function(res) {
                var i;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal("gainesville");
                    var j;
                    var status = false;
                    for(j = 0; j < res.body[i]._source.tags.length; j++){
                        if(res.body[i]._source.tags[j] == "nightlife")
                            status = true;
                    }
                    expect(status).to.equal(true);
                }

              });
              done();
    });
});
describe('Search Router test',function(){
    it('should return restaurants whose name partialy/completely matches the search query', function() {
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":"blaze pizza",
                "city":"gainesville",
            })
            .then(function(res) {
                var i;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal("gainesville");
                    var j;
                    testRestaurantName(res.body[i]._source,"pizza");
                }

              });
              done();
    });


});  

function testRestaurantName(res,query){
    var queryA = query.split(" ");
    expect(res.name.split(" ")).to.contain.members(queryA);
}



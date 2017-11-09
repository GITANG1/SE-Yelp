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

     

});
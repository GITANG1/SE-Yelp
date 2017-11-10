const chai = require('chai');
var expect  = require('chai').expect;

chai.use(require('chai-http'));

var request = require('request');

var should = require('should');

describe('search By Tag',function(){

    it('should return restaurant which contain breakfast menus and are located in gainesville', function() {
        var tag = "breakfast";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/searchByTag')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "tag":tag,
                "city":city,
            })
            .then(function(res) {
                var i;
                var prevRating = 1000;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    var status = false;
                    for(j = 0; j < res.body[i]._source.tags.length; j++){
                        if(res.body[i]._source.tags[j] == tag)
                            status = true;
                    }
                    expect(status).to.equal(true);
                    var rating = parseFloat(res.body[i]._source.rating)
                    expect(rating).to.not.be.above(prevRating);
                    prevRating = rating;
                }

              });
              done();
    });

    it('should return restaurant which contain lunch menus sorted raating wise and are located in gainesville', function() {
        var tag = "lunch";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/searchByTag')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "tag":tag,
                "city":city,
            })
            .then(function(res) {
                var i;
                var prevRating = 1000;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    var status = false;
                    for(j = 0; j < res.body[i]._source.tags.length; j++){
                        if(res.body[i]._source.tags[j] == tag)
                            status = true;
                    }
                    expect(status).to.equal(true);
                    var rating = parseFloat(res.body[i]._source.rating)
                    expect(rating).to.not.be.above(prevRating);
                    prevRating = rating;
                }

              });
              done();
    });

    it('should return restaurant which satisfy nightlife constraint and are located in gainesville', function() {
        var tag = "nightlife";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/searchByTag')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "tag":tag,
                "city":city,
            })
            .then(function(res) {
                var i;
                var prevRating = 1000;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    var status = false;
                    for(j = 0; j < res.body[i]._source.tags.length; j++){
                        if(res.body[i]._source.tags[j] == tag)
                            status = true;
                    }
                    expect(status).to.equal(true);
                    var rating = parseFloat(res.body[i]._source.rating)
                    expect(rating).to.not.be.above(prevRating);
                    prevRating = rating;
                }

              });
              done();
    });
});
describe('Search Router test',function(){
    it('should return restaurants whose name or menu partialy/completely matches the search query blaze pizza', function() {
        var searchString = "blaze pizza";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":searchString,
                "city":city,
            })
            .then(function(res) {
                var i;
                var status = false;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    status = testRestaurantName(res.body[i]._source,searchString);
                    if(status != true){
                        
                        status = testRestaurantMenu(res.body[i]._source,searchString);
                        expect(status).to.equal(true);
                    }
                    else
                        expect(status).to.equal(true);    
                }

              });
              done();
    });

    it('should return restaurants whose name or menu partialy/completely matches the search query pizza', function() {
        var searchString = "pizza";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":searchString,
                "city":city,
            })
            .then(function(res) {
                var i;
                var status = false;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    status = testRestaurantName(res.body[i]._source,searchString);
                    if(status != true){
                        status = testRestaurantMenu(res.body[i]._source,searchString);
                        expect(status).to.equal(true);
                    }
                    else
                        expect(status).to.equal(true);    
                }

              });
              done();
    });

    it('should return restaurants whose name or menu partialy/completely matches the search query pizza house', function() {
        var searchString = "pizza";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":searchString,
                "city":city,
            })
            .then(function(res) {
                var i;
                var status = false;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    status = testRestaurantName(res.body[i]._source,searchString);
                    if(status != true){
                        status = testRestaurantMenu(res.body[i]._source,searchString);
                        expect(status).to.equal(true);
                    }
                    else
                        expect(status).to.equal(true);    
                }

              });
              done();
    });

    it('should first return restaurants whose name partialy/completely matches and then the restaurants whose menu matches but not the name for search query blaze pizza', function() {
        var searchString = "blaze pizza";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":searchString,
                "city":city,
            })
            .then(function(res) {
                var i;
                var status = false;
                var isMenuStart = false;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    if(!isMenuStart)
                    status = testRestaurantName(res.body[i]._source,searchString);

                    else{
                        var tempStatus = testRestaurantName(res.body[i]._source,searchString);
                        expect(tempStatus).to.equal(false);
                    }

                    if(status != true){
                        status = testRestaurantMenu(res.body[i]._source,searchString);
                        expect(status).to.equal(true);
                        status = false;
                        isMenuStart = true;
                    }
                    else
                        expect(status).to.equal(true);    
                }

              });
              done();
    });

    it('should first return restaurants whose name partialy/completely matches and then the restaurants whose menu matches but not the name for search query pizza', function() {
        var searchString = "pizza";
        var city = "gainesville";
        return chai
            .request('http://localhost:3000/restaurants')
            .post('/search')
            // .field('myparam' , 'test')
            //.set('content-type', 'application/x-www-form-urlencoded')
            .send( {
                "search":searchString,
                "city":city,
            })
            .then(function(res) {
                var i;
                var status = false;
                var isMenuStart = false;
                for(i = 0; i < res.body.length; i = i + 1){
                    expect(res.body[i]._source.city).to.equal(city);
                    var j;
                    if(!isMenuStart)
                    status = testRestaurantName(res.body[i]._source,searchString);

                    else{
                        var tempStatus = testRestaurantName(res.body[i]._source,searchString);
                        expect(tempStatus).to.equal(false);
                    }

                    if(status != true){
                        status = testRestaurantMenu(res.body[i]._source,searchString);
                        expect(status).to.equal(true);
                        status = false;
                        isMenuStart = true;
                    }
                    else
                        expect(status).to.equal(true);    
                }

              });
              done();
    });

});  

function testRestaurantName(res,query){
    var queryA = query.split(" ");
    var targetA = res.name.toLowerCase();

    //var status = false;
    var i;
    for(i = 0; i < queryA.length; i++){
        if(targetA.indexOf(queryA[i]) > -1)
           return true;
    }
    return false;
}

function testRestaurantMenu(res,query){
    var queryA = query.split(" ");
    var targetIntermediate = res.menu;
    //var status = false;
    var i,m;
    for(m = 0; m < targetIntermediate.length; m++){
        var targetA = targetIntermediate[m].toLowerCase();

        for(i = 0; i < queryA.length; i++){
            if(targetA.indexOf(queryA[i]) > -1)
                return true;
        }       
    }
    return false;
}



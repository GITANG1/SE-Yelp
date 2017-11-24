const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./database');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt_payload => " + JSON.stringify(jwt_payload));
    console.log("id: " + jwt_payload.data._id);
    getUserById(jwt_payload.data._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

function getUserbyId(id, callback) {
  var query = {
    "query": {
      "terms": {
        "_id": [id]
      }
    }
  };

  client.search({
    index: config.DB,
    type: 'restaurants',
    body: query
  }, function (error, response) {

    callback(error, response.hits.hits[0]._source)
  });
}

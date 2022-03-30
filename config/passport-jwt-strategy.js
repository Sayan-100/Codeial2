const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const env = require('./enviroment');

const User = require('../model/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // secretOrKey: 'codeial'
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {


    //only checking the id
    User.findById(jwtPayLoad._id, function(err, user) {
        if (err) {
            console.log('Error in finding user from JWt');
            return;
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }


    })

}));

module.exports = passport;
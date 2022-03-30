const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../model/user');

const env = require('./enviroment');

//tell passport to use a strategy for google login
passport.use(new googleStrategy({
        // clientID: "36815387300-ui0j8e4ln3057q52scv2an8i5asu1k13.apps.googleusercontent.com",
        // clientSecret: "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",
        // callbackURL: "http://localhost:8000/users/auth/google/callback",

        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,

    },

    function(accessToken, refreshToken, profile, done) {

        //find the required user
        User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
            if (err) {
                console.log('error in google strategy-passport', err);
                return;
            }

            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user) {
                //if found set this user as req.user;
                return done(null, user);
            } else {

                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function(err, user) {
                    if (err) {
                        console.log('error user');
                        return;
                    }

                    return done(null, user);
                })
            }


        })
    }


))


module.exports = passport;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

//authentication using passport

passport.use(new LocalStrategy({
        usernameField: 'email', //we detect the user by email  
        passReqToCallback: true

    },

    //email and passwodrs are passed on
    function(req, email, password, done) {


        //find a user and establish the identity
        User.findOne({ email: email }, function(err, user) {

            if (err) {
                req.flash('error', err);
                console.log('Error in finding user -> Passport');
                return done(err);
            }

            if (!user || user.password != password) {

                req.flash('error', 'Invalid Username/Password');
                console.log('Invalid usermname/ password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


//picks out the information from the user which needs to be set on the session cookie 
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

//picking out the id from the session cookie and convert it to the user by finding it in the database 
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('Error in finding user -> Passport');
        }

        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    //  if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

//to access the authenticated user in the views
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are sending this to the locals for views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy( localOptions, function(email, password, done){
  // Verify this email/username and password, call done with the user
  // if it is the correct email and password
  // otherwhise, call done with false.
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(); }
    if (!user) { return done(null, false); }

    // compare passwords - Is password equal to user.password
    
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT stategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in database
  // If it does, call 'done' with that other
  // otherwhise, call it without a user object.
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);

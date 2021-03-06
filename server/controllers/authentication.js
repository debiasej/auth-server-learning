//const async = require('asyncawait/async');
//const await = require('asyncawait/await');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

function tokenForUser(user) {
  timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const pass = req.body.password;

  checkEmailAndPasswordExist();

  // Using async/await feature is cleaner but now it isn't available yet.
  // A workaround is use asyncawait library but then the code isn't clean.
  // (async (function findUser() {
  //   var resp = await (User.findOne({ email: email }));
  //   console.log("await:");
  //   console.log(resp);
  // }))();

  // See if a user with a given email exists
  User.findOne({ email: email })
  .then( (existingUser) => {

    // If a user with email does exist, return a error
    if (existingUser) {
      // 422 Unprocessable Entity
      res.status(422).send({ error: 'Email is in use' });
    }
    // If an user with email doesn't exist, create and save user record
    return createAndStoreUser();
  })
  .then( (user) => {
    // Respond to request indicating the user was created
    res.json({ success: tokenForUser(user) });
  })
  .catch( (err) => {
    return next(err);
  });

  function checkEmailAndPasswordExist () {
    if (!email || !pass) {
      return res.status(422).send({ error: 'You must provided an email and password' });
    }
  }

  function createAndStoreUser () {
    const user = new User({ email: email, password: pass });
    return user.save();
  }
}

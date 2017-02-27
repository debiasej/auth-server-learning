//const async = require('asyncawait/async');
//const await = require('asyncawait/await');
const User = require('../models/user');

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
  .then(function(existingUser) {

    // If a user with email does exist, return a error
    if (existingUser) {
      // 422 Unprocessable Entity
      return res.status(422).send({ error: 'Email is in use' });
    }
    // If an user with email doesn't exist, create and save user record
    createAndStoreUser()

  })
  .catch(function(err){
    return next(err);
  });

  function checkEmailAndPasswordExist () {
    if (!email || !pass) {
      return res.status(422).send({ error: 'You must provided an email and password' });
    }
  }

  function createAndStoreUser () {
    const user = new User({ email: email, password: pass });

    user.save(function(err) {
      if (err) { return next(err); }
      // Respond to request indicating the user was created
      res.json({ success: true });
    });
  }
}

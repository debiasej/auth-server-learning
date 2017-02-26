const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const pass = req.body.password;

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

  function createAndStoreUser () {
    const user = new User({ email: email, password: pass });

    user.save(function(err) {
      if (err) { return next(err); }
      // Respond to request indicating the user was created
      res.json({ success: true });
    });
  }
}

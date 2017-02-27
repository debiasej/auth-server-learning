const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcript = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Encript password
// 'Pre' means that before saving a model, run this function.
userSchema.pre('save', function(next){
  const user = this; // user model

  // Generate a salt
  bcript.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Hash our password using the salt
    bcript.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      // Override plain password with the encripted one.
      user.password = hash;
      next();
    });
  })
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;

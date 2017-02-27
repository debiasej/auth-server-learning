const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// DB Setup
mongoose.Promise = global.Promise;

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Before saving a model, run this function.
userSchema.pre('save', function(next){
  const user = this; // user model
  encryptPass(user, next);
});

function encryptPass(user, next) {
  // Generate a salt
  bcrypt.genSalt(10)
  .then( (salt) => {
    // Hash our password using the salt
    return bcrypt.hash(user.password, salt, null);
  })
  .then( (hash) => {
      user.password = hash;
      next();
  })
  .catch((err) => {
    return next(err);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OfficerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  uniqueId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Encrypt password before saving
OfficerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

OfficerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Officer = mongoose.model('Officer', OfficerSchema);

module.exports = Officer;

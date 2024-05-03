const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  profileBanner: String,
  currentLocation: locationSchema,
  locations: [locationSchema],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plan: {
    type: Number,
    required: true,
  },
});

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isoCode: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: Number,
    required: true,
  },
  zones: [zoneSchema],
});

stateSchema.pre('save', function (next) {
  const state = this;
  const totalZonePlan = state.zones.reduce((sum, zone) => sum + zone.plan, 0);

  if (totalZonePlan > state.plan) {
    const error = new Error('Total city plans cannot exceed the state plan');
    next(error);
  } else {
    next();
  }
});

module.exports = mongoose.model('State', stateSchema);

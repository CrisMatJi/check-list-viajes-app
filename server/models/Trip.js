const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  familyId: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Trip', TripSchema);
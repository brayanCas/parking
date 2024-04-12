const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  vehicleId: {
    type: String,
    required: true
  },
  spaceId: {
    type: String,
    required: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  minuteValue: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

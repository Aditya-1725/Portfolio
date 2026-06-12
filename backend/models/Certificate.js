const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  issuer: {
    type: String,
    required: true
  },

  issueDate: {
    type: Date,
    required: true
  },

  image: {
    type: String,
    default: ""
  },

  featured: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);
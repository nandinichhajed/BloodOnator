const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: [true, "Name of blood group donated"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        message: "Please select from this category",
      },
    },
    amount: {
      type: Number,
      required: [true, "enter blood donated in ml"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A donation must have a user who wants to donate"],
      ref: "User",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A donation must have a city where it got donated"],
      ref: "City",
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A donation must have a appointment"],
      ref: "Appointment",
    },
    month: {
      type: Number,
      required: [true, "Donation must have a month"],
      min: [0, "Can not be less"],
      max: [11, "Can not be more"],
    },
    year: {
      type: Number,
      required: [true, "Donation must have a year"],
      min: [2022, "Can not be less"],
    },
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("Donation", donationSchema);

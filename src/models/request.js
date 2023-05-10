const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: [true, "Name of blood group requested"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        message: "Please select from this category",
      },
    },
    amount: {
      type: Number,
      required: [true, "Enter blood requested amount"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A donation must have a user who wants to receive"],
      ref: "User",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A donation must have a city where it got request"],
      ref: "City",
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A request must have a appointment"],
      ref: "Appointment",
    },
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("Request", requestSchema);

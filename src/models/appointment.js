const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A Appointment must have a user"],
      ref: "User",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "An Appointment must have a city"],
      ref: "City",
    },
    date: {
      type: Date,
      required: [true, "An appointment must have a date"],
    },
    type: {
      type: String,
      required: [true, "An Appointment must have a type"],
      enum: {
        values: ["donation", "request"],
        message: "Please select from this category",
      },
    },
    status: {
      type: String,
      default: "appointment",
      required: [true, "An Appointment must have a status"],
      lowercase: true,
      enum: {
        values: ["appointment", "cancelled", "completed"],
        message: "Please select from this category",
      },
    },
    bloodGroup: {
      type: String,
      required: [true, "An appointment must have a blood group"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        message: "Please select from this category",
      },
    },
    amount: {
      type: Number,
      default: 0,
      required: [true, "An appointment must contain amount of blood in ml"],
    },
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("Appointment", appointmentSchema);

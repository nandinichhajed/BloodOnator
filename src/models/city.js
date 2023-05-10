const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A city must have a name"],
      lowercase: true,
      trim: true,
      maxlength: [100, "Name must be less than 100 characters"],
    },
    label: {
      type: String,
      required: [true, "A city must have a label"],
      trim: true,
      maxlength: [100, "label must be less than 100 characters"],
    },
    value: {
      type: String,
      required: [true, "A city must have a value"],
      trim: true,
      lowercase: true,
      maxlength: [100, "value must be less than 100 characters"],
    },
    state: {
      type: String,
      required: [true, "A city must have a State"],
      lowercase: true,
      trim: true,
      maxlength: [100, "State name must be less than 100 characters"],
    },
    country: {
      type: String,
      required: [true, "A city must have a country"],
      lowercase: true,
      trim: true,
      maxlength: [100, "country name must be less than 100 characters"],
    },
    address: {
      type: String,
      required: [true, "A city must have a address"],
      lowercase: true,
      trim: true,
      maxlength: [150, "Name must be less than 150 characters"],
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A city must have a user manager"],
      ref: "User",
    },
    "A+": {
      type: Number,
      default: 0,
      min: 0,
    },
    "B+": {
      type: Number,
      default: 0,
      min: 0,
    },
    "O+": {
      type: Number,
      default: 0,
      min: 0,
    },
    "AB+": {
      type: Number,
      default: 0,
      min: 0,
    },
    "A-": {
      type: Number,
      default: 0,
      min: 0,
    },
    "B-": {
      type: Number,
      default: 0,
      min: 0,
    },
    "O-": {
      type: Number,
      default: 0,
      min: 0,
    },
    "AB-": {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("City", citySchema);

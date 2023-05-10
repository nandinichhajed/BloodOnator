const mongoose = require("mongoose");

// Library
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
      lowercase: true,
      maxlength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "A user must have a email"],
      trim: true,
      unique: [true, "A user must have a unique email"],
      lowercase: true,
      maxlength: [50, "Email must be less than 50 characters"],
      validate: validator.isEmail,
    },
    password: {
      type: String,
      trim: true,
      minlength: [7, "A password must contain at least 7 characters"],
    },
    role: {
      type: String,
      default: "user",
      lowercase: true,
      enum: {
        values: ["user", "admin", "manager"],
        message: "Please select from this category",
      },
    },
    readyToDonate: {
      type: Boolean,
      default: false,
    },
    bloodGroup: {
      type: String,
      required: [true, "A user must have a blood group"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        message: "Please select from this category",
      },
    },
    mobile: {
      type: Number,
      required: [true, "A user must have a mobile number"],
    },
    donatedBlood: {
      type: Number,
      default: 0,
    },
    requestedBlood: {
      type: Number,
      default: 0,
    },
    aadharNumber: {
      type: Number,
      required: [true, "A user must have a aadhar number"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "A user must have a date of birth"],
    },
    weight: {
      type: Number,
      required: [true, "A user must have a weight"],
    },
    address: {
      type: String,
      required: [true, "A user must have a address"],
      trim: true,
      maxlength: [100, "Address must be less than 100 characters"],
    },
    city: {
      type: String,
      required: [true, "A user must have a city"],
      trim: true,
      maxlength: [100, "Name must be less than 100 characters"],
    },
    country: {
      type: String,
      required: [true, "A user must have a Country"],
      trim: true,
      maxlength: [100, "Country must be less than 100 characters"],
    },
    donatedInPastThreeMonths: {
      type: Boolean,
      default: false,
    },
    lastDonatedOn: {
      type: Date,
    },
    preMedicalHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "preMedicalHistory",
    },
    tokens: [
      {
        token: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hiding private information
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

// Hashing Password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Getting jwt login token
userSchema.methods.getJwtLoginToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// Checking is valid password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exporting Model
module.exports = mongoose.model("User", userSchema);

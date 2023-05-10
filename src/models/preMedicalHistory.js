const mongoose = require("mongoose");

const preMedicalHistorySchema = new mongoose.Schema(
  {
    diabetes: {
      type: Boolean,
      default: false,
      required: [true, "A user must enter the details about diabetes"],
    },
    hiv: {
      type: Boolean,
      default: false,
      required: [true, "A user must enter the details about hiv"],
    },
    jaundice: {
      type: Boolean,
      default: false,
      required: [true, "A user must enter the details about jaundice"],
    },
    bloodTransmission: {
      type: Boolean,
      default: false,
      required: [
        true,
        "A user must enter the details about blood transmission",
      ],
    },
    recurrentInfection: {
      type: Boolean,
      default: false,
      required: [
        true,
        "A user must enter the details about recurrent infection",
      ],
    },
    hepatitis: {
      type: Boolean,
      default: false,
      required: [true, "A user must enter the details about Hepatitis "],
    },
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("preMedicalHistory", preMedicalHistorySchema);

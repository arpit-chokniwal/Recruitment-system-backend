const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    companyName: { type: String },
    userName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Admin", adminSchema);

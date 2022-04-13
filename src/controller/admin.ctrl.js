const express = require("express");
const rout = express.Router();
const Admin = require("../models/admin.model");
const User = require("../models/admin.model");

rout.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const pass = await User.findOne({ password: req.body.password });
    if (!pass) {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }
    return res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.get("/", async (req, res) => {
  try {
    const AllAdmin = await Admin.find().lean().exec();
    return res.status(201).send({ AllAdmin });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.patch("/:id", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    res.status(201).send({ updatedAdmin });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.delete("/:id", async (req, res) => {
  try {
    const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
    return res.status(201).send({ deleteAdmin });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = rout;

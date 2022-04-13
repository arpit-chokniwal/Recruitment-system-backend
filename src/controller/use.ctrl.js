const express = require("express");
const rout = express.Router();
const User = require("../models/user.model");
const Job = require("../models/job.model");
const EventEmitter = require("events");
const {
  appliedSuccessfully,
  shortlistedSuccessfully,
  interviewScheduled,
  selectedResult,
  rejectedResult,
} = require("../utils");

const eventEmitter = new EventEmitter();

rout.post("/", async (req, res) => {
  try {
    const isExists = await User.findOne({
      $and: [{ jobSchemaId: req.body.jobSchemaId }, { email: req.body.email }],
    })
      .lean()
      .exec();
    if (isExists) {
      return res.status(400).send(new Error("already applied for this job"));
    }
    const NewUser = await User.create(req.body);
    const user = await User.findById(NewUser._id)
      .populate({
        path: "jobSchemaId",
        select: ["companyName", "jobTitle", "city", "salary"],
        populate: {
          path: "adminSchemaId",
          select: ["companyName", "userName", "email"],
        },
      })
      .lean()
      .exec();
    eventEmitter.on("applied successfully", appliedSuccessfully);
    eventEmitter.emit("applied successfully", NewUser, user);
    return res.status(201).send(NewUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.get("/", async (req, res) => {
  try {
    const AllUser = await User.find()
      .populate({
        path: "jobSchemaId",
        select: ["companyName", "jobTitle", "city", "salary"],
        populate: {
          path: "adminSchemaId",
          select: ["companyName", "userName", "email"],
        },
      })
      .lean()
      .exec();

    return res.status(201).send(AllUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.get("/:id", async (req, res) => {
  try {
    const AllJob = await User.find({ jobSchemaId: req.params.id })
      .populate({
        path: "jobSchemaId",
        select: ["companyName", "city", "jobTitle", "salary"],
        populate: {
          path: "adminSchemaId",
          select: ["companyName", "userName", "email"],
        },
      })
      .lean()
      .exec();
    // console.log(AllJob)

    return res.status(201).send(AllJob);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.patch("/:id", async (req, res) => {
  try {
    const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    const user = await User.findById(UpdateUser._id)
      .populate({
        path: "jobSchemaId",
        select: ["companyName", "jobTitle", "city", "salary"],
        populate: {
          path: "adminSchemaId",
          select: ["companyName", "userName", "email"],
        },
      })
      .lean()
      .exec();
    if (
      UpdateUser.isShortListed == true &&
      UpdateUser.isInterviewScheduled == false &&
      UpdateUser.isHired == false
    ) {
      eventEmitter.on("shortlisted successfully", shortlistedSuccessfully);
      eventEmitter.emit("shortlisted successfully", UpdateUser, user);
    } else if (
      UpdateUser.isShortListed == true &&
      UpdateUser.isInterviewScheduled == true &&
      UpdateUser.isHired == false
    ) {
      eventEmitter.on("interview scheduled successfully", interviewScheduled);
      eventEmitter.emit("interview scheduled successfully", UpdateUser, user);
    } else if (
      UpdateUser.isShortListed == true &&
      UpdateUser.isInterviewScheduled == true &&
      UpdateUser.isHired == true
    ) {
      eventEmitter.on("hired successfully", selectedResult);
      eventEmitter.emit("hired successfully", UpdateUser, user);
    }

    const data = await User.find({ jobSchemaId: UpdateUser.jobSchemaId })
      .lean()
      .exec();

    return res.status(201).send(data);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

rout.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "jobSchemaId",
        select: ["companyName", "jobTitle", "city", "salary"],
        populate: {
          path: "adminSchemaId",
          select: ["companyName", "userName", "email"],
        },
      })
      .lean()
      .exec();
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    eventEmitter.on("rejected successfully", rejectedResult);
    eventEmitter.emit("rejected successfully", deleteUser, user);
    const data = await User.find({ jobSchemaId: deleteUser.jobSchemaId })
      .lean()
      .exec();
    console.log(data);

    return res.status(201).send(data);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = rout;

const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

//GET /api/jobs
//@public route
//@get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user_id: req.user.id });
  res.status(200).send(jobs);
});

//@public route
//@get single job
//GET /api/jobs/:id
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }
  res.status(200).json(job);
});

//@public route
//@create single job
//POST /api/jobs
const createJob = asyncHandler(async (req, res) => {
  const { title, company, description } = req.body;

  if (!title || !company || !description) {
    res.status(400);
    throw new Error({ message: "Complete all relevant fields" });
  }

  const job = await Job.create({
    title,
    company,
    description,
    user_id: req.user.id,
  });
  res.status(201).json(job);
});

//@public route
//@update single job
//PUT /api/jobs
const updateJob = asyncHandler(async (req, res) => {
  const { title, company, description, application_date } = req.body;
  if (!title || !company || !description) {
    res.status(400);
    throw new Error({ message: "Complete all relevant fields" });
  }
  let date;
  if (application_date) {
    const d = application_date.split(",");
    date = new Date(`${d[0]}-${d[1]}-${d[2]}`);
    // date = new Date("2022-03-25");
  }
  const job = await Job.findOne({ _id: req.params.id });
  if (job.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User does not have permission ");
  }
  const updatedjob = await Job.findOneAndUpdate(req.params.id, {
    title,
    company,
    description,
  });
  if (date) {
    updatedjob.application_date = date;
    await updatedjob.save();
  }
  res.status(200).json(updatedjob);
});

//@public route
//@delete single job
//DELETE /api/jobs
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User does not have permission ");
  }
  await Job.deleteOne({ _id: req.params.id });
  res.status(200).send({ message: `Delete contact for ${req.params.id}` });
});

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };

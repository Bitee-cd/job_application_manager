const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please Add a title for your job"],
    },
    company: {
      type: String,
      required: [true, "Please enter the company name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the company name"],
    },
    application_date: {
      type: Date,
      // required: [true, "When did you apply this job"],
    },
    hr_interview: {
      type: Boolean,
      default: false,
      // required: [true, "Did you do an interview with the HR"],
    },
    tech_interview: {
      type: Boolean,
      default: false,
      // required: [true, "Did you do any technical interview"],
    },
    acceptance: {
      type: Boolean,
      default: false,
      // required: [true, "Where you accepted or rejected"],
    },
    acceptance_date: {
      type: Date,

      // required: [true, "When did you get the job this job"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

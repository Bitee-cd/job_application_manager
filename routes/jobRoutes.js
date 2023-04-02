const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();
router.use(validateToken);
router.route("/").get(getAllJobs).post(createJob);
router
  .route("/:id")
  .get(getJob)
  .post(updateJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;

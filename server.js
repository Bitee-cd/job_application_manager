const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const app = express();
const port = process.env.PORT || 5000;

dbConnect();

app.use(express.json());
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`server is working on port ${port}`);
});

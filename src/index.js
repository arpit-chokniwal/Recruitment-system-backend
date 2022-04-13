const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./configs/db");
const admin = require("./controller/admin.ctrl");
const job = require("./controller/job.ctrl");
const user = require("./controller/use.ctrl");
require("dotenv").config({ path: "../.env" });
const Port = process.env.PORT || 2345;

app.use(cors());
app.use(express.json());

app.use("/admin", admin);
app.use("/job", job);
app.use("/user", user);

app.listen(Port, async () => {
  try {
    await connect();
    console.log(`Listen at port ${Port}`);
  } catch (e) {
    console.log(e);
  }
});

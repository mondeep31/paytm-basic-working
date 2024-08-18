const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

app.use(cors());
const app = express();

app.use("/api/v1", rootRouter);


app.listen(3000)
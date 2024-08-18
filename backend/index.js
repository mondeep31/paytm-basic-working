const express = require("express");
const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

app.use("/api/v1", mainRouter);
app.use("/api/v1/user", userRouter);




// app.use(express.json);
// app.post('/signup', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
// })
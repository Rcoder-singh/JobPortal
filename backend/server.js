const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const userRouter = require("./routes/UserRoutes");

const connection = require("./Db");
connection();

app.use(cors());
app.use(express.json()); //* Middleware

//! Middleware are functions that can have the access of requesting to an object and responding to an object.
//! They can modify the request and response and can also be used between routes.

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});

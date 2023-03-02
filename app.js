const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
console.log("hu hai");
app.use("/api/user", userRoutes);

module.exports = app;

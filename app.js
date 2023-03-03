const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;

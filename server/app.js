const express = require("express");
const user = require("../routes/user");

const app = express();

// Parse json
app.use(express.json());
app.use("/api/user", user);

module.exports = app;

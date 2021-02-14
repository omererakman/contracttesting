var express = require("express");
var itemRouter = require("./item");

var app = express();

app.use("/item/", itemRouter);

module.exports = app;
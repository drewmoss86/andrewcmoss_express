const express = require("express");
const path = require("path");
const fs = require("fs");
const pug = require("pug");

const app = express();

//Pug middleware
app.set("view engine", "pug");

//Homepage route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// set up port listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connect } = require("./src/utils/database/db");

const user = require("./src/api/routes/user.routes");
const galaxies = require("./src/api/routes/galaxies.routes");
const planets = require("./src/api/routes/planets.routes");

connect();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use("/public", express.static("public"));

app.use("/api", user);
app.use("/api", galaxies);
app.use("/api", planets);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Something went wrong");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

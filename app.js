// Configuring Dot Env
require("dotenv").config();

// Importing Packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Configuring express
const app = express();

// API DOCS Swagger
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// * Routes
app.use("/api/v1/auth", require("./src/routes/auth"));

// User routes
app.use("/api/v1/users", require("./src/routes/user/user"));
app.use("/api/v1/admin", require("./src/routes/admin/user"));

// Donation routes
app.use("/api/v1/user/donations", require("./src/routes/user/donation"));
app.use("/api/v1/admin/donations", require("./src/routes/admin/donation"));

// Request Blood routes
app.use("/api/v1/user/received", require("./src/routes/user/request"));
app.use("/api/v1/admin/received", require("./src/routes/admin/request"));

// City Routes
app.use("/api/v1/admin/cities", require("./src/routes/admin/city"));
app.use("/api/v1/manager/cities", require("./src/routes/manager/city"));
app.use("/api/v1/user/cities", require("./src/routes/user/city"));

// Appointment Routes
app.use(
  "/api/v1/admin/appointments",
  require("./src/routes/admin/appointment")
);
app.use(
  "/api/v1/manager/appointments",
  require("./src/routes/manager/appointment")
);
app.use("/api/v1/user/appointments", require("./src/routes/user/appointment"));

// Exporting app
module.exports = app;

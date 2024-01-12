const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.route");
const { PORT, MONGO_PASSWORD } = require("./config/constants");

const app = express();

app.use(express.json());

const dbConnections = {};

function getDatabaseConnection(tenantId) {
  if (dbConnections[tenantId]) {
    return dbConnections[tenantId];
  }

  const dbUri = `mongodb+srv://m001-student:${MONGO_PASSWORD}@sandbox.gx3bw.mongodb.net/multi-poc-${tenantId}?retryWrites=true&w=majority`;
  const dbConnection = mongoose.createConnection(dbUri);

  dbConnections[tenantId] = dbConnection;
  console.log("Db Connections", { dbConnection });
  return dbConnection;
}

app.use((req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];
  if (!tenantId) {
    return res.status(400).send("Tenant ID is required");
  }

  req.dbConnection = getDatabaseConnection(tenantId);
  next();
});

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

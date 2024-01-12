const path = require("path");

require("dotenv-safe").config({
  path: path.join(__dirname, "../.env"),
});

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
};

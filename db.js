const { Pool } = require("pg");

module.exports = new Pool({
  user: "",
  host: "localhost",
  database: "migracode",
  password: "",
  port: 5432,
});

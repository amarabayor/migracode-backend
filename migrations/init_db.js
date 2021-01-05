const fs = require("fs");
const { Pool } = require("pg");

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "migracode",
  password: "",
  port: 5432,
});

pool
  .query(fs.readFileSync("migrations/0_initial_snapshot.sql").toString())
  .then(() => {
    console.info("Migration successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

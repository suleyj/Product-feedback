const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ProductFeedback",
  password: "30Seynab",
  port: 5432,
});

module.exports = pool;

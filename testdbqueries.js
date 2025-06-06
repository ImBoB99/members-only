const { pool } = require("./config/pool");

async function main() {
  const result = await pool.query("SELECT * FROM users WHERE username = 'domingos@hotmail.com'");
  console.log(result.rows[0]);
}

main();
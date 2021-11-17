const { Pool } = require("pg");
const { DB_LINK } = require("../config/config");
const poll = new Pool({
  connectionString: DB_LINK
});

const pg = async (SQL, ...values) => {
  const client = await poll.connect();
  try {
    const data = await client.query(SQL, values);
    return data.rows;
  } catch (error) {
  } finally {
    client.release();
  }
};

module.exports = pg
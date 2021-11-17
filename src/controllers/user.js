const jwt = require("../utils/jwt");
const { v4: UUID } = require("uuid");
const pg = require("../database/pg");

const GET = async (req, res) => {
  const { access_token } = req.cookies;
  var decoded = jwt.verify(access_token);

  const { username } = req.params;
  let found = await pg("select * from users where user_name = $1", username);
  const postsFound = await pg(
    'select * from posts where post_author = $1',
    found[0].user_id
  );
  if (decoded.username === username) {
    found.current = true;
    res.status(200).render("user.ejs", { found, postsFound });
  } else if (found) {
    found.current = false;
    res.status(200).render("user.ejs", { found, postsFound });
  } else {
    res.status(404).render("404.ejs");
  }
};

const POST = async (req, res) => {
  
};

module.exports = {
  GET,
  POST,
};

const jwt = require("../utils/jwt");
const pg = require("../database/pg")

const GET = async (req, res) => {
  const { access_token } = req.cookies;
  var decoded = jwt.verify(access_token);
  const data = await pg('select * from posts')
  const comments = await pg('select * from comments')
  res.render("index.ejs",  { data, decoded , comments});
};

const POST = async (req, res) => {
  const { title } = req.body;
  const { access_token } = req.cookies;
  var decoded = jwt.verify(access_token);
  // const user =await pg('select * from users where user_name = $1' , decoded.username)
  // const data = await pg('insert into posts(comment_title , post_author , post_user) values ($1, $2 ,$3)', title ,user[0]?.user_id , user[0]?.user_name)
  // res.status(200).redirect(`/user/${decoded.username}`);
  res.end()
};

module.exports = {
  GET,
  POST,
};

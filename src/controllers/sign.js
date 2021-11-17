const jwt = require("../utils/jwt");
const pg = require("../database/pg");
const GET = (_, res) => {
  res.render("sign.ejs");
};

const POST = async (req, res) => {
  const { username, password } = req.body;
  const oldUser = await pg('select * users where user_name = $1' , username)
  if(oldUser) {
    res.send({"message": "this username alread in use"})
    return
  }
  if (username && password) {
    const newUser = {
      username,
      password,
    };
    try {
      await pg("insert into users(user_name , user_password) values ($1, $2)", username ,password );
    } catch (error) {
      console.log(error);
    }
    
    const token = jwt.sign(newUser);

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.redirect("/");
  } else {
    res.render("sign.ejs")
  }
};

module.exports = {
  GET,
  POST,
};

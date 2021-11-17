const express = require("express");
const path = require("path");
const jwt = require("./utils/jwt");
const pg = require("./database/pg")
const cookie = require("cookie-parser");
const { serverPort } = require("./config/config");
const AuthMiddleware = require("./middlewares/auth");

const home = require("./controllers/home");
const sign = require("./controllers/sign");
const login = require("./controllers/login");
const user = require("./controllers/user");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookie());
app.use(AuthMiddleware);

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", home.GET);
app.post("/", home.POST);

app.get("/sign", sign.GET);
app.post("/sign", sign.POST);

app.get("/login", login.GET);
app.post("/login", login.POST);

app.get("/user/:username", user.GET);
app.post("/user", user.POST);

app.post("/comment/:id",async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const { access_token } = req.cookies;
  var decoded = jwt.verify(access_token);
  const user = await pg('select * from users where user_name = $1' , decoded.username)
  const data = await pg('insert into comments(comment_title ,comment_post, comment_author , comment_user) values ($1, $2 ,$3, $4)', title ,id , user[0]?.user_id, user[0]?.user_name)
  res.status(200).redirect('/');
})

app.listen(serverPort, () => {
  console.log(`Server started at http://localhost:${serverPort}`);
});

const jwt = require("jsonwebtoken");
const token = require("../config/config").JWT_TOKEN;

module.exports = {
  sign: (payload) => jwt.sign(payload, token),
  verify: (payload) => jwt.verify(payload, token),
};

require("dotenv").config()

module.exports = {
    serverPort : process.env.SERVER_PORT,
    DB_LINK: process.env.DB_LINK,
    JWT_TOKEN: process.env.JWT_TOKEN
}
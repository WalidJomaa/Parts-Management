const mysql = require("mysql")

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: "",
  database: process.env.DATABASE_DB,
})

module.exports = {
  db: connection,
  mysql,
}

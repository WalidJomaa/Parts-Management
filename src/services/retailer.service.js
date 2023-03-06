const { db } = require("../configs/db.config")

// Select all retailers
function viewAll() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ct_retailers"
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Select one retailer
function findOne(retailerId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ct_retailers WHERE id=${db.escape(retailerId)} LIMIT 1`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

module.exports = {
  viewAll,
  findOne,
}

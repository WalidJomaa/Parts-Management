const { db } = require("../configs/db.config")

// Select all manufacturers
function viewAll() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from ct_manufacturers"
    db.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

// Create a new manufacturer into db
function create(name) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ct_manufacturers (name) VALUES (${db.escape(name)})`
    db.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

module.exports = {
  viewAll,
  create,
}

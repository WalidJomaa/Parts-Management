const { db } = require("../configs/db.config")

// Create a new part into db
function create(payload) {
  const { manufacturerId, name, price } = payload
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ct_parts (manufacturer_id,name,price) VALUES (${db.escape(manufacturerId)},${db.escape(
      name
    )},${db.escape(price)})`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Select all parts
function viewAll() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from ct_parts"
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Delete a part from db
function deleteById(partId, manufacturerId) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ct_parts WHERE ct_parts.id=${db.escape(partId)} AND ct_parts.manufacturer_id=${db.escape(
      manufacturerId
    )}`
    db.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

module.exports = {
  create,
  viewAll,
  deleteById,
}

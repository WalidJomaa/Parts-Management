const { db } = require("../configs/db.config")

// Create stock for existing retailer with existing parts
function createStock(payload) {
  const { retailerId, partId } = payload
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ct_stock (retailer_id, part_id) VALUES (${db.escape(retailerId)},${db.escape(partId)})`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Update the part quantity
function updateStockQuantity(payload) {
  const { retailerId, stockId, quantity } = payload
  console.log("payload", payload)
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ct_stock SET quantity=${db.escape(quantity)} WHERE id=${db.escape(
      stockId
    )} AND retailer_id=${db.escape(retailerId)}`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Select all stock list filtred by retailer
function viewAllStockByRetailer(retailerId) {
  console.log(retailerId)
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from ct_stock WHERE retailer_id=${db.escape(retailerId)}`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

module.exports = {
  createStock,
  updateStockQuantity,
  viewAllStockByRetailer,
}

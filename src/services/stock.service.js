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
  const { retailerId, partId, quantity } = payload
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ct_stock SET quantity=${db.escape(quantity)} WHERE retailer_id=${db.escape(
      retailerId
    )} AND part_id=${db.escape(partId)}`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Select all parts from stock filtred by retailer
function viewAllStockByRetailer(retailerId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ct_stock WHERE retailer_id=${db.escape(retailerId)}`
    db.query(sql, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

// Select one part from stock by retailer
function findOnePartInStock(retailerId, partId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT *, ct_parts.price FROM ct_stock INNER JOIN ct_parts ON ct_stock.part_id=ct_parts.id WHERE retailer_id=${db.escape(
      retailerId
    )} AND part_id=${db.escape(partId)} LIMIT 1`
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
  findOnePartInStock,
}

const { db } = require("../configs/db.config")
const stockService = require("./stock.service")

// Create an order for client
function requestOrderByClient(retailerId, clientId, parts) {
  const generateReference = Math.floor(Math.random() * 1000) + 1
  return new Promise((resolve, reject) => {
    const sqlInsertOrder = `INSERT INTO ct_orders (reference,retailer_id,client_id)
    VALUES (${db.escape(generateReference)},${db.escape(retailerId)},${db.escape(clientId)})   
    `
    db.query(sqlInsertOrder, (error, results) => {
      if (error) reject(error)
      parts.map((part) => {
        insertMultiPartsByOrderRef(generateReference, part)
        return true
      })
      resolve(results)
    })
  })
}

// Insert parts sales by order's reference
function insertMultiPartsByOrderRef(generateReference, part) {
  new Promise((resolve, reject) => {
    const sqlInsertOrderDetail = `INSERT INTO ct_order_details (order_reference,part_id,quantity)
    VALUES (${db.escape(generateReference)},${db.escape(part.part_id)},${db.escape(part.quantity)})   
    `
    db.query(sqlInsertOrderDetail, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

module.exports = {
  requestOrderByClient,
}

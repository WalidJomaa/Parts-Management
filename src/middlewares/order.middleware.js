const stockService = require("../services/stock.service")
const retailerService = require("../services/retailer.service")

// Check the part quantity in the stock
async function checkPartQuantity(req, res, next) {
  try {
    const retailerId = req.params.retailerId
    const parts = req.body.parts.map((part) => ({
      part_id: part.part_id,
      quantity: part.quantity,
    }))
    for (let partIndex = 0; partIndex < parts.length; partIndex++) {
      const partItem = parts[partIndex]
      let currentPartInStock = await stockService.findOnePartInStock(retailerId, partItem.part_id)
      if (partItem.quantity <= 0)
        return res.status(400).json({
          status: 400,
          message: "The parts quantity is empty",
        })
      if (partItem.quantity > currentPartInStock[0].quantity) {
        return res.status(400).json({
          status: 400,
          message: "The parts quantity greater than the retailers stock",
        })
      }
    }
    return next()
  } catch (error) {
    return res.status(400).json({
      status: 400,
      messaage: error.messaage,
    })
  }
}

// Check the order is empty
async function checkOrder(req, res, next) {
  try {
    const retailerId = req.params.retailerId
    const parts = req.body.parts.map((part) => ({
      part_id: part.part_id,
      quantity: part.quantity,
    }))
    if (parts.length === 0 || retailerId === undefined || retailerId === null)
      return res.status(400).json({
        status: 400,
        messaage: "The order is empty",
      })
    // Check the retailer is exist
    const retailerInstance = await retailerService.findOne(retailerId)
    if (retailerInstance.length === 0)
      return res.status(400).json({
        status: 400,
        messaage: "The retailer is not exist",
      })
    return next()
  } catch (error) {
    return res.status(400).json({
      status: 400,
      messaage: error.messaage,
    })
  }
}

module.exports = {
  checkPartQuantity,
  checkOrder,
}

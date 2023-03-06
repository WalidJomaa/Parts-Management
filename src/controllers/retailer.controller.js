const retailerService = require("../services/retailer.service")
const stockService = require("../services/stock.service")
const orderService = require("../services/order.service")

// View all retailers list
async function viewAll(req, res) {
  try {
    const retailerInstance = await retailerService.viewAll()
    return res.status(200).json({
      status: 200,
      message: "Retailer list",
      data: retailerInstance,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Update part quantity in the stock
async function updateStockQuantity(req, res) {
  try {
    const retailerId = req.params.retailerId
    const { quantity, partId } = req.body
    const stockInstance = await stockService.updateStockQuantity({ retailerId, quantity, partId })
    return res.status(200).json({
      status: 200,
      message: "Quantity has been changed",
      data: stockInstance,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// View all stock list filtred by retailer
async function viewAllStockByRetailer(req, res) {
  try {
    const retailerId = req.params.retailerId
    const stockInstance = await stockService.viewAllStockByRetailer(retailerId)
    return res.status(200).json({
      status: 200,
      message: "Stock retrieved successfully",
      data: stockInstance,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Client request an order from retailer
async function requestOrderByClient(req, res) {
  try {
    const retailerId = req.params.retailerId
    const clientId = req.body.clientId
    const parts = req.body.parts.map((part) => ({
      part_id: part.part_id,
      quantity: part.quantity,
    }))
    let generateOrderDetails = []
    for (let partIndex = 0; partIndex < parts.length; partIndex++) {
      const partItem = parts[partIndex]
      let currentPartInStock = await stockService.findOnePartInStock(retailerId, partItem.part_id)
      generateOrderDetails.push({
        name: currentPartInStock[0].name,
        price: currentPartInStock[0].price,
        quantity: partItem.quantity,
      })
      let generatePayload = {
        retailerId,
        partId: partItem.part_id,
        quantity: currentPartInStock[0].quantity - partItem.quantity,
      }
      await stockService.updateStockQuantity(generatePayload)
    }
    return res.status(200).json({
      status: 200,
      message: "Your order has been sent",
      data: {
        client_id: clientId,
        retailer_id: parseInt(retailerId),
        order_details: generateOrderDetails,
        discount: calculateDiscount(generateOrderDetails),
      },
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Calculate discount
function calculateDiscount(parts) {
  let total = 0
  if (parts.length > 0 || parts !== undefined) {
    total = parts.reduce((accumulatorPart, currentPart) => {
      return accumulatorPart + currentPart.price
    }, 0)
  }
  if (total >= 200) return 20
  if (total >= 100) return 10
  return 0
}

module.exports = {
  viewAll,
  updateStockQuantity,
  viewAllStockByRetailer,
  requestOrderByClient,
}

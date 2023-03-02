const retailerService = require("../services/retailer.service")
const stockService = require("../services/stock.service")

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
    const { retailerId, stockId } = req.params
    const quantity = req.body.quantity
    const stockInstance = await stockService.updateStockQuantity({ retailerId, stockId, quantity })
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

module.exports = {
  viewAll,
  updateStockQuantity,
  viewAllStockByRetailer,
}

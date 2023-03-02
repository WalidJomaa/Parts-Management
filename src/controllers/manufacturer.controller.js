const manufacturerService = require("../services/manufacturer.service")
const stockService = require("../services/stock.service")

// Create a new manufacturer
async function create(req, res) {
  try {
    const name = req.body.name
    if (name === null || name === undefined || name === "") {
      return res.status(404).json({
        status: 404,
        message: `Payload is undefined`,
      })
    }
    const manufacturers = await manufacturerService.create(name)
    return res.status(200).json({
      status: 200,
      message: "Manufacturer has been created successfully",
      data: manufacturers,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Show list of manufacturers
async function viewAll(req, res) {
  try {
    const manufacturers = await manufacturerService.viewAll()
    return res.status(200).json({
      status: 200,
      message: "Successfully manufacturers retrieved",
      data: manufacturers,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Add sale of parts into the stock
async function createStock(req, res) {
  try {
    const { retailerId, partId } = req.body
    const stockInstance = await stockService.createStock({ retailerId, partId })
    return res.status(200).json({
      status: 200,
      message: "Retailer list",
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
  create,
  viewAll,
  createStock,
}

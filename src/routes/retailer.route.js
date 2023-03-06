const express = require("express")
let router = express.Router()

// Controllers
const retailerController = require("../controllers/retailer.controller")

// Middlewares
const stockMiddleware = require("../middlewares/order.middleware")

// Routes
router.get("/", retailerController.viewAll)
router.get("/:retailerId/stock", retailerController.viewAllStockByRetailer)
router.patch("/:retailerId/stock", retailerController.updateStockQuantity)
router.post(
  "/:retailerId/request-order",
  stockMiddleware.checkOrder,
  stockMiddleware.checkPartQuantity,
  retailerController.requestOrderByClient
)

module.exports = router

const express = require("express")
let router = express.Router()

// Controllers
const retailerController = require("../controllers/retailer.controller")

// Routes
router.get("/", retailerController.viewAll)
router.get("/:retailerId/stock", retailerController.viewAllStockByRetailer)
router.patch("/:retailerId/stock/:stockId", retailerController.updateStockQuantity)

module.exports = router

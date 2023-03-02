const express = require("express")
let router = express.Router()

// Import controller
const manufacturerController = require("../controllers/manufacturer.controller")

// Routes
router.get("/", manufacturerController.viewAll).post("/create", manufacturerController.create)
router.post("/create-stock", manufacturerController.createStock)

module.exports = router

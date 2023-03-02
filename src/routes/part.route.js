const express = require("express")
let router = express.Router()

// Controllers
const partController = require("../controllers/part.controller")

// Routes
router.get("/", partController.viewAll)
router.post("/create", partController.create)
router.route("/:partId").delete(partController.deleteById)

module.exports = router

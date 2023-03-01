const express = require("express")
let router = express.Router()

// Import controller
const manufacturerController = require("../controllers/manufacturer.controller")

// Routes
router.get("/", manufacturerController.viewAll).post("/create", manufacturerController.create)
router
  .route("/:manufacturerId")
  .delete((req, res) => {
    res.send("Delete manufacturer as id " + req.params.manufacturerId)
  })
  .patch((req, res) => {
    res.send("Update manufacturer as id " + req.params.manufacturerId)
  })

module.exports = router

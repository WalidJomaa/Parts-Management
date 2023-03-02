const partService = require("../services/part.service")

// Create a new part depends on manufacturer
async function create(req, res) {
  try {
    const { manufacturerId, name, price } = req.body
    const partInstance = await partService.create({ manufacturerId, name, price })
    return res.status(200).json({
      status: 200,
      message: "Successfully part has been created",
      data: partInstance,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Show list of parts
async function viewAll(req, res) {
  try {
    const partInstance = await partService.viewAll()
    return res.status(200).json({
      status: 200,
      message: "Successfully parts retrieved",
      data: partInstance,
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    })
  }
}

// Delete a part by id
async function deleteById(req, res) {
  try {
    const partId = req.params.partId
    const { manufacturerId } = req.body
    const partInstance = await partService.deleteById(partId, manufacturerId)
    return res.status(200).json({
      status: 200,
      message: "Part has been deleted",
      data: partInstance,
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
  create,
  deleteById,
}

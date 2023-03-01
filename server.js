const express = require("express")
const app = express()
require("dotenv").config()

const { db } = require("./src/configs/db.config")
const manufacturerRouteParent = require("./src/routes/manufacturer.route")

// handle coming request to see if there is any json and convert it to an object
app.use(express.json())

// Open connection
db.connect((error) => {
  if (error) {
    console.log("Error connecting:" + error.stack)
    throw error
  }
  console.log("Connection success")
})

// Parent routes
app.use("/api/manufacturers", manufacturerRouteParent)

app.listen(process.env.PORT || 3000)

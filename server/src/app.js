const express = require('express')
cookieParser = require('cookie-parser')
const app = express()

const upload = require("./middlewares/multer.middleware")


app.use(express.json())
app.use(cookieParser())

// import routes
const organizationRoute = require('./routes/organization.router')
const documentsRoute = require("./routes/document.router")

// Use Routes
app.use("/api/v1/organizations" , organizationRoute)
app.use("/api/v1/documents" ,upload.single('document'), documentsRoute)

module.exports = app;
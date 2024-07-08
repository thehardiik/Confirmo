const express = require('express')
cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieParser())

// import routes
const organizationRoute = require('./routes/organization.router')

// Use Routes
app.use("/api/v1/organizations" , organizationRoute)

module.exports = app;
const express = require('express')
const app = express()


app.use(express.json())

// import routes
const organizationRoute = require('./routes/organization.router')

// Use Routes
app.use("/api/v1/organizations" , organizationRoute)

module.exports = app;
const express = require("express")
const {registerOrganization, loginOrganization} = require("../controllers/organization.controller")

const router = express.Router()

router.route('/register').post((req,res) => {

    registerOrganization(req, res)

})

router.route('/login').post((req,res) => {

    loginOrganization(req, res)

})


module.exports = router


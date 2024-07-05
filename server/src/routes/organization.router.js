const express = require("express")
const registerOrganization = require("../controllers/organization.controller")

const router = express.Router()

router.route('/register').post((req,res) => {

    registerOrganization(req, res)

})


module.exports = router


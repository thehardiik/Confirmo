const express = require("express")
const {registerOrganization, loginOrganization, logoutOrganization} = require("../controllers/organization.controller")
const verifyJWT = require("../middlewares/auth.middleware")

const router = express.Router()

router.route('/register').post((req,res) => {

    registerOrganization(req, res)

})

router.route('/login').post((req,res) => {
    loginOrganization(req, res)
})

router.route('/logout').post(verifyJWT, (req,res) => {
    logoutOrganization(req, res)
})


module.exports = router


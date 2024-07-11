const express = require("express")
const {registerOrganization, loginOrganization, logoutOrganization, resetAccessToken} = require("../controllers/organization.controller")
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

router.route('/refresh-token').post((req,res) => {
    resetAccessToken(req, res)
})

router.route('/isLogin').get(verifyJWT, (req,res) => {
    if(!req.token){
        res.status(401).json({
            isLogin: false
        })
    }else{
        res.status(200).json({
            isLogin: true
        })
    }
})


module.exports = router


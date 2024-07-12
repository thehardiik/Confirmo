const express = require("express")
const {createDocument, verifyDocument} = require("../controllers/document.controller")
const verifyJWT = require("../middlewares/auth.middleware")
const {sendMail} = require("../controllers/email.controller")
const path = require('path')


const router = express.Router()

router.route('/create').post(verifyJWT , (req,res) => {
    createDocument(req, res)
})

router.route('/verify').post((req,res) => {
    verifyDocument(req, res)
})

router.route('/getImage').get((req,res) => {
    const filepath = path.join(__dirname, '../../Output', "Encrypted.png");
    res.sendFile(filepath)
})

router.route('/report').post(verifyJWT , (req,res) => {
    sendMail(req, res)
})

module.exports = router
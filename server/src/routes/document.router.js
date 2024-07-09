const express = require("express")
const {createDocument, verifyDocument} = require("../controllers/document.controller")


const router = express.Router()

router.route('/create').post((req,res) => {
    createDocument(req, res)
})

router.route('/verify').post((req,res) => {
    verifyDocument(req, res)
})

module.exports = router
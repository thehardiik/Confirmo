const express = require("express")
const {createDocument} = require("../controllers/document.controller")


const router = express.Router()

router.route('/create').post((req,res) => {
    createDocument(req, res)
})

module.exports = router
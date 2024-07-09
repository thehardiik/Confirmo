const express = require("express")


const router = express.Router()

router.route('/create').post((req,res) => {
    console.log("Yeeeee!")
})

module.exports = router
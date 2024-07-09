const jwt = require("jsonwebtoken")

function verifyJWT (req, res, next){

    const token = req.cookies.AccessToken

    if(!token) {
        console.log("Unauthorized Access")
        throw new Error
    }


    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!decodedToken._id){
        console.log("Invalid token")
        throw new Error
    }

    req.token = decodedToken

    next()
}

module.exports = verifyJWT
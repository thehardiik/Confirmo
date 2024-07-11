const jwt = require("jsonwebtoken")

let errorCode = 400
let errorMessage = ""

function verifyJWT (req, res, next){

    try {
        const token = req.cookies.AccessToken
    
        if(!token) {
            errorMessage = "Unauthorized Request: No access token found"
            errorCode = 401;
            throw new Error
        }
    
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        if(!decodedToken._id){
            errorMessage = "Unauthorized Request: Invalid Token"
            errorCode = 401;
            throw new Error
        }
    
        req.token = decodedToken
    
        next()

    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }
}

module.exports = verifyJWT
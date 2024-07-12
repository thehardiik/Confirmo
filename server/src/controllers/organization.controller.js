const Organization = require("../db/organization.model")
const jwt = require('jsonwebtoken')


let errorCode = 500;
let errorMessage = ""

async function generateAccessAndRefreshToken(organization) {

    const accessToken = organization.generateAccessToken()
    const refreshToken = organization.generateRefreshToken()

    organization.refreshToken = refreshToken

    await organization.save({validateBeforeSave: false})

    return {accessToken, refreshToken}
}

async function registerOrganization(req, res) {
    try {
        
        // Get data from frontend
        const {name, email, password} = req.body


        // validate data 
        if(name === ""){
            errorMessage = "Bad Request: Name is required"
            errorCode = 400;
            throw new Error
        }

        if(email === ""){
            errorMessage = "Bad Request: Email is required"
            errorCode = 400;
            throw new Error
        }

        if(password === ""){
            errorMessage = "Bad Request: Password is required"
            errorCode = 400;
            throw new Error
        }



        // Check if organization already exist
        const existedOrg = await Organization.findOne({email})

        if(existedOrg){
            errorMessage = "Bad Request: Organization already exist"
            errorCode = 403;
            throw new Error
        }


        // Create Organization
        const createdOrg = await Organization.create({
            name,
            email,
            password
        })

        if(!createdOrg){
            errorMessage = "Database Error: Organization creation failed"
            errorCode = 500;
            throw new Error
        }

      
        res.status(200).json({
            message: "Organization Registered"
        })


    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }
}

async function loginOrganization(req, res) {

    try {
        // get data from frontend
        const {email, password} = req.body

        //validate
        if(!email){
            errorCode = 400
            errorMessage = "Bad Request: Email is required"
            throw new Error
        }

        if(!password){
            errorCode = 400
            errorMessage = "Bad Request: Password is required"
            throw new Error
        }
    
        // find organization with given email id
        const existedOrg = await Organization.findOne({email})
    
        if(!existedOrg){
            errorCode = 404
            errorMessage = "Bad Request: No organization with this email found"
            throw new Error
        }
    
        // check password
        const isPassCorrect = await existedOrg.isPasswordCorrect(password)
    
        if(!isPassCorrect){
            errorCode = 403
            errorMessage = "Bad Request: Incorrect Password"
            throw new Error
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existedOrg)

        if(!accessToken || !refreshToken){
            errorCode = 500
            errorMessage = "Database Error: Token creation failed"
            throw new Error
        }

        // TODO: Remove password and refresh token before sending to frontend

        const options = {
            httpOnly: true,
            secure: true
        }

        res
        .status(200)
        .cookie("AccessToken" , accessToken, options)
        .cookie("RefreshToken" , refreshToken, options)
        .json({
            existedOrg,
            accessToken,
            refreshToken
        })

    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }


}

async function logoutOrganization(req, res){

    try {
        await Organization.findByIdAndUpdate(
            {
                _id: req.token._id
            },
            {
                refreshToken: ""
            },
            {
                new: true
            }
        )
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        res
        .status(200)
        .clearCookie("AccessToken" , options)
        .clearCookie("RefreshToken" , options)
        .json({
            message: "Logout"
        })

    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }
}

async function resetAccessToken(req, res){

    try {
        const recRefreshToken = req.cookies.RefreshToken
    
        if(!recRefreshToken){
            errorCode = 401
            errorMessage = "Unauthorized Request: No refresh token found"
            throw new Error
        }
        
        const decodedToken = jwt.verify(recRefreshToken, "refresh-token-seccret-92-9-0")

        if(!decodedToken){
            errorCode = 500
            errorMessage = "Unauthorized Request: Token verification failed"
            throw new Error
        }
    
        const org = await Organization.findOne({_id: decodedToken._id})

        if(!org){
            errorCode = 500
            errorMessage = "Unauthorized Request: No account with given token"
            throw new Error

        }
    
        
        
        if(org.refreshToken !== recRefreshToken){
            errorCode = 401
            errorMessage = "Unauthorized Request: Invalid Token"
            throw new Error
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(org)

        if(!accessToken){
            errorCode = 500
            errorMessage = "Database Error: Access token generation failed"
            throw new Error
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        res
        .status(200)
        .cookie("AccessToken" , accessToken, options)
        .cookie("RefreshToken" , recRefreshToken, options)
        .json({
            message: "Refresh Successfully"
        })
    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }

}

module.exports = {registerOrganization, loginOrganization, logoutOrganization, resetAccessToken}
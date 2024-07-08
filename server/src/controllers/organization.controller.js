const Organization = require("../db/organization.model")

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

        console.log(name)

        // validate data 
        if(name === ""){
            console.log("Name cannot be empty")
            throw new Error
        }

        if(email === ""){
            console.log("Name cannot be empty")
            throw new Error
        }

        if(password === ""){
            console.log("Name cannot be empty")
            throw new Error
        }



        // Check if organization already exist
        const existedOrg = await Organization.findOne({email})

        if(existedOrg){
            console.log("Organization Already Exist")
            throw new Error
        }


        // Create Organization
        const createdOrg = await Organization.create({
            name,
            email,
            password
        })

        if(!createdOrg){
            throw new Error
        }

        console.log(createdOrg)

        res.status(200).json({
            message: "Organization Registered"
        })


    } catch (error) {
        console.log(error)
    }
}

async function loginOrganization(req, res) {

    try {
        // get data from frontend
        const {email, password} = req.body
    
        // find organization with given email id
        const existedOrg = await Organization.findOne({email})
    
        if(!existedOrg){
            console.log("Organization with this email does not exist")
            throw new Error
        }
    
        // check password
        const isPassCorrect = await existedOrg.isPasswordCorrect(password)
    
        if(!isPassCorrect){
            console.log("Password Incorrect")
            throw new Error
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existedOrg)
        console.log(accessToken, refreshToken)

        // TODO: Remove password and refresh token before sending to frontend

        const options = {
            httpOnly: true,
            secure: true
        }

        res
        .status(200)
        .cookie("Access Token" , accessToken, options)
        .cookie("Refresh Token" , refreshToken, options)
        .json({
            existedOrg,
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log(error)
    }


}

module.exports = {registerOrganization, loginOrganization}
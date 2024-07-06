const Organization = require("../db/organization.model")

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

module.exports = registerOrganization
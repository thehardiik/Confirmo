const Document  = require("../db/documents.model")
const ImageEncryption = require("../utils/EncryptData")
const path = require('path')

async function createDocument(req, res){
    
    try {
        const {title, owner, data} = req.body
    
        if(!owner){
            console.log("Name cannot be empty")
            throw new Error
        }
    
        if(!title){
            console.log("Name cannot be empty")
            throw new Error
        }
    
        const createdDocument = await Document.create({
            title,
            owner
        })
    
    
        const verificationToken = await createdDocument.generateVerificationToken()
    
        if(!verificationToken){
            console.log("Token creation failed")
            throw new Error
        }
    
        console.log(verificationToken)

        await ImageEncryption(req.file.filename, verificationToken)

        const filepath = path.join(__dirname, '../../Output', "Encrypted.png");
    
        res.status(200).sendFile(filepath)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {createDocument}
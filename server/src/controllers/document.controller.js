const Document  = require("../db/documents.model")
const ImageEncryption = require("../utils/EncryptData")
const path = require('path')
const jwt = require('jsonwebtoken')
const Decryption = require("../utils/DecryptData")

let errorMessage = ""
let errorCode = 500

async function createDocument(req, res){
    
    try {
        const {title, owner, data} = req.body
    
        if(!owner){
            errorMessage = "Bad Request: Owner is required"
            errorCode = 400;
            throw new Error
        }
    
        if(!title){
            errorMessage = "Bad Request: Title is required"
            errorCode = 400;
            throw new Error
        }
    
        const createdDocument = await Document.create({
            title,
            owner
        })
    
    
        const verificationToken = await createdDocument.generateVerificationToken()
    
        if(!verificationToken){
            errorMessage = "Internal Server Error: Token creation failed"
            errorCode = 500;
            throw new Error
        }
    

        await ImageEncryption(req.file.filename, verificationToken)

        const filepath = path.join(__dirname, '../../Output', "Encrypted.png");
    
        res.status(200).sendFile(filepath)

    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }
}

async function verifyDocument(req, res){
    const token = await Decryption(req.file.filename)


    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    

    res.json({
        message: "success?"
    })
}

module.exports = {createDocument, verifyDocument}
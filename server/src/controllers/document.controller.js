const Document  = require("../db/documents.model")
const ImageEncryption = require("../utils/EncryptData")
const path = require('path')
const jwt = require('jsonwebtoken')
const Decryption = require("../utils/DecryptData")
const Organization = require("../db/organization.model")
const fs = require("fs")

let errorMessage = "No document found"
let errorCode = 500

async function createDocument(req, res){
    
    try {

        if(!req.token._id){
            errorMessage = "Unauthorized request: Login using organization"
            errorCode = 401;
            throw new Error
        }


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

        //const Org = await Organization.findOne({_id: req.token._id})
        const organization = req.token._id

        const createdDocument = await Document.create({
            title,
            owner,
            data,
            organization
        })

        if(!createdDocument){
            errorMessage = "Database Error: Document creation failed"
            errorCode = 500;
            throw new Error
        }
        const filepath1 = path.join(__dirname, '../../Output', "Encrypted.png");
        fs.unlinkSync(filepath1)
        const verificationToken = await createdDocument.generateVerificationToken(req.token.email)
    
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

    try {
        const token = await Decryption(req.file.filename)

        if(!token){
            errorCode = 500
            errorMessage = "Internal Server Error: Decryption failed"
            throw new Error
        }
        const decodedToken = jwt.verify(token, "access-token-seccret-22-2-0")

        if(!decodedToken.org){
            errorCode = 401
            errorMessage = "Invalid Document"
            throw new Error
        }
    
        const doc = await Document.findOne({_id: decodedToken._id})
        
        if(!decodedToken.org){
            errorCode = 500
            errorMessage = "Database Error: No document found"
            throw new Error
        }
    
        res
        .status(200)
        .json({
            title: doc.title,
            owner: doc.owner,
            data: doc.data,
            email: decodedToken.org,
            id: doc._id
        })
    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }
}

module.exports = {createDocument, verifyDocument}
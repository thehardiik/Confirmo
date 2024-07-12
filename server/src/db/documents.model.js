const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const documentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        //required: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    
})

documentSchema.methods.generateVerificationToken = function (orgEmail){
    return jwt.sign(
        {
            _id: this._id,
            owner: this.owner,
            org: orgEmail
        },
        "access-token-seccret-22-2-0",
        {
            expiresIn: "10d"
        }
    )
}

const Document = mongoose.model('Document' , documentSchema)

module.exports = Document
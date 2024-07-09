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
        //required: true
    },
    
})

documentSchema.methods.generateVerificationToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            owner: this.owner,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const Document = mongoose.model('Document' , documentSchema)

module.exports = Document
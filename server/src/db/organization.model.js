const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    documents: [{
        type: Schema.Types.ObjectId,
        ref: "Document"     
    }],
    refreshToken: {
        type: String,
    }
})

organizationSchema.pre("save" , async function (next){
    
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }else{
        next()
    }  
})

organizationSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

organizationSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email
        },
        "access-token-seccret-22-2-0",
        {
            expiresIn: "1d"
        }
    )
}

organizationSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        "refresh-token-seccret-92-9-0",
        {
            expiresIn: "10d"
        }
    )
}

const Organization = mongoose.model('Organization' , organizationSchema)

module.exports = Organization
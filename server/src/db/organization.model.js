const bcrypt = require('bcrypt')
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

const Organization = mongoose.model('Organization' , organizationSchema)

module.exports = Organization
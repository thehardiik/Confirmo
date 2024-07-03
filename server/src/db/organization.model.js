const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    organiszationID: {
        type: String,
        required: true,
        unique: true
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

organizationSchema.pre("save" , async function (next) {

    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

organizationSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const Organization = new mongoose.Model('Organization' , organizationSchema)

module.exports = Organization
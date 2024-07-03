
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const organizationModel = new Schema({
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

const Organization = new mongoose.Model('Organization' , organizationModel)

module.exports = Organization
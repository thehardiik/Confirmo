const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    documentID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    organisation: {
        type: String,
        require: true
    }
})

const Document = mongoose.model('Document' , documentSchema)

module.exports = Document
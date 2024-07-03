const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    documentID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    
})

const Document = mongoose.model('Document' , documentSchema)

module.exports = Document
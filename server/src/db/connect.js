const mongoose = require('mongoose')

function connectDB() {
    try {
        return mongoose.connect("")
        
    } catch (error) {
        throw error
    }
}

module.exports = connectDB;


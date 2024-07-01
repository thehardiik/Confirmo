const mongoose = require('mongoose')

function connectDB() {
    try {
        return mongoose.connect(process.env.MONGODB_URL)
        
    } catch (error) {
        throw error
    }
}

module.exports = connectDB;


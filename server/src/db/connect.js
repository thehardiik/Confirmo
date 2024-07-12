const mongoose = require('mongoose')

function connectDB() {
    try {
        return mongoose.connect("mongodb+srv://hardiknjms21:nomorepassword@cluster0.q6rfeva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        
    } catch (error) {
        throw error
    }
}

module.exports = connectDB;


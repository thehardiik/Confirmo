require('dotenv').config() 
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const app = require('./app')


connectDB()
.then(() => {
    console.log("MongoDB Connection Successfull")

    app.listen(4000 , () => {
        console.log("App is running on PORT: 4000")
    })   
})
.catch((error) => {
    console.log("Mongo DB Connection Error: " , error)
})


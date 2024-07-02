require('dotenv').config() 
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const app = require('./app')


connectDB()
.then(() => {
    console.log("MongoDB Connection Successfull")

    app.listen(3000 , () => {
        console.log("App is running on PORT")
    })   
})
.catch((error) => {
    console.log("Mongo DB Connection Error: " , error)
})


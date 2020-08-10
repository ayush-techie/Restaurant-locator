const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://ms-trainee-batch1:1K4y8zZUMpp7Cjr4@mssandbox.2vs3j.mongodb.net/sample_restaurants',{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log("Database Connected!!")
})
.catch((err)=>{
    console.log("Database connection Failed!!")
})

const geodata=require('./routes/geodata')

app.use(geodata)

app.listen(3000,()=>{console.log("Server Running")})
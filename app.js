import express from 'express'
const app = express();
app.listen(7777,()=>{
    console.log("Listening...")
})

app.use("/",(req,res)=>{
    res.send("Main")
})

app.use("/test",(req,res)=>{
    res.send("Test")
})

app.use("/hello",(req,res)=>{
    res.send("Hello")
})
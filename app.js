const https=require("https")
const fs=require("fs")
const express=require("express")
const helmet=require("helmet")
const  path = require('path')

const app=express()
// app.use(helmet())




app.get("/secret",(req,res)=>{
   return res.send("your personal secret is 42")
})

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "public","index.html"))
})



// https.createServer({
//   key: fs.readFileSync("key.pem"),
//   cert:fs.readFileSync("private.pem")
// },app)
// .listen(8080,()=>{
//   console.log("App is running on localhost 8080")
// })

app.listen(8080,()=>{
  console.log("App is running on localhost 8080")
})
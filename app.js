const https=require("https")
const fs=require("fs")
const express=require("express")
const res = require("express/lib/response")
const  path = require('path')

const app=express()





app.get("/secret",()=>{
   return res.send("your personal secret is 42")
})

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "public","index.html"))
})



https.createServer({
  key: fs.readFileSync("key.pem"),
  cert:fs.readFileSync("private.pem")
})
.listen(8080,()=>{
  console.log("App is running on localhost 8080")
})
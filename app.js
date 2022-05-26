const https=require("https")
const fs=require("fs")
const express=require("express")
const helmet=require("helmet")
const  path = require('path')

const app=express()
app.use(helmet())


const ClientId="149317685876-tc8an50m1h707e1d7d31j7pinlqjkp9g.apps.googleusercontent.com"
const ClientSecretKey="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"


const config={
  ClientId,
  ClientSecretKey
}


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
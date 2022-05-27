const https=require("https")
const fs=require("fs")
const express=require("express")
const helmet=require("helmet")
const  path = require('path')
const passport=require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

const app=express()
app.use(helmet())
app.use(passport.initialize())


const ClientId="149317685876-tc8an50m1h707e1d7d31j7pinlqjkp9g.apps.googleusercontent.com"
const ClientSecretKey="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"


const config={
  ClientId,
  ClientSecretKey
}

passport.use(new GoogleStrategy({
  clientID: config.ClientId,
  clientSecret: config.ClientSecretKey,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
     cb(null,profile);
}
));


app.get("/auth/google",passport.authenticate('google',{
  scope:['email','profile']
}))


app.get("/auth/google/callback",
  passport.authenticate("google",{
  failureRedirect:"",
  successRedirect:"/",
  session:false
}),(req,res)=>{
  console.log("Google called us back");
})


app.get("/auth/logout",(req,res)=>{})
app.get("/failure",(req,res)=>{
  res.send("Failed to login")
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
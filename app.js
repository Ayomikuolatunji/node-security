const https=require("https")
const fs=require("fs")
const express=require("express")
const helmet=require("helmet")
const  path = require('path')
const passport=require("passport")
const cookieSession = require('cookie-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

const app=express()
app.use(helmet())
app.use(passport.initialize())
const ClientId=process.env.ClientId
const ClientSecretKey=process.env.ClientSecretKey


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

app.use(cookieSession({
  name:"cookie"
}))

function checkLoggedIn(req, res, next) { 
  console.log('Current user is:', req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}


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
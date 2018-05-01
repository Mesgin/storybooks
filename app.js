const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000
const passport = require('passport')

// Passport config
require('./config/passport')(passport)

// Load Routes
const auth = require('./routes/auth')

app.get('/',(req,res)=>{
  res.send('worked')
})

app.use('/auth',auth)

app.listen(port,()=>{
  console.log(`Server running at ${port}`)
})
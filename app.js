const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000
const passport = require('passport')

// load User model
require('./models/User')

// Passport config
require('./config/passport')(passport)

// Load Routes
const auth = require('./routes/auth')

// Load keys
const keys = require('./config/keys')

// Mongoose promises
mongoose.Promise = global.Promise
// Mongoose connect
mongoose.connect(keys.mongooseURI)
  .then(()=> console.log('MongoDb connected'))
  .catch(err => console.log(err))

app.get('/',(req,res)=>{
  res.send('worked')
})

app.use('/auth',auth)

app.listen(port,()=>{
  console.log(`Server running at ${port}`)
})
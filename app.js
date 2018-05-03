const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// load models
require('./models/User')
require('./models/Story')

// Passport config
require('./config/passport')(passport)

// Load Routes
const index = require('./routes/index')
const auth = require('./routes/auth')
const stories = require('./routes/stories')

// Load keys
const keys = require('./config/keys')

// HBS helper
const {truncate,stripTags,formatDate} = require('./helpers/hbs')

// Mongoose promises
mongoose.Promise = global.Promise
// Mongoose connect
mongoose.connect(keys.mongoURI)
  .then(()=> console.log('MongoDb connected'))
  .catch(err => console.log(err))

// Handlebars middleware
app.engine('handlebars',exphbs({
  helpers:{
    truncate,
    stripTags
  },
  defaultLayout: 'main'
}))
app.set('view engine','handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use((req,res,next)=>{
  res.locals.user = req.user || null
  next()
})

// Set static folder
app.use(express.static(path.join(__dirname,'public')))

// Use routes
app.use('/',index)
app.use('/auth',auth)
app.use('/stories',stories)


app.listen(port,()=>{
  console.log(`Server running at ${port}`)
})
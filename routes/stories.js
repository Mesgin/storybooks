const express = require('express')
const router = express.Router()
const {ensureAthenticated} = require('../helpers/auth')
// Stories index
router.get('/',(req,res)=>{
  res.render('stories/index')
})

// Add story form
router.get('/add', ensureAthenticated , (req,res)=>{
  res.render('stories/add')
})

module.exports = router
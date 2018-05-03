const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../helpers/auth')
// Stories index
router.get('/',(req,res)=>{
  res.render('stories/index')
})

// Add story form
router.get('/add', ensureAuthenticated , (req,res)=>{
  res.render('stories/add')
})

// Process add story
router.post('/',(req,res)=>{
  let allowComments
  if(req.body.allowComments){
    allowComments = true
  } else {
    allowComments = false
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments,
    user: req.user.id
  }

  new Story(newStory)
        .save()
        .then(story=>{
          res.redirect(`/stories/show/${story.id}`)
        })
})

module.exports = router
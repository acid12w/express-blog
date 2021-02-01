const express = require('express')
const router = express.Router();
const ArticleModel = require('../models/articles');
const moment = require('moment');

function asyncHandler(cb){
  return async (req,res,next)=> {
    try {
      await cb(req,res,next);
    } catch(err){
      res.render('error', {error:err});
    }
  }
}

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/about', (req, res) => {
  res.render('about')
});

router.get('/contact', (req, res) => {
  res.render('contact')
});

// GET /New Article
router.get('/new', (req, res) => {  
  return res.render('articles/new') 
});

// POST /New Article
router.post('/new',  asyncHandler(async(req, res, next) => { 
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('article', 'Articles is required').notEmpty();
 

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('articles/new', {
      errors: errors
    });
  } else{

    const format = function publishedAt() {
      const date = moment(Date.now()).format('YYYY', 'MMMM', 'D');
      return date; 
    }
    dateFormat = format(Date.now());
    
    let articleDoc = {
      author: req.body.author, 
      date: dateFormat,   
      title: req.body.title,
      body: req.body.article,
      id: Date.now()
    }
      const article = new ArticleModel(articleDoc);
      try{
        await article.save();
        req.flash('success', 'Article added'); 
        res.redirect('/blog')   
      } catch (err) {
        console.log('fail')  
        next(err) 
      }
    }
}));


module.exports = router; 
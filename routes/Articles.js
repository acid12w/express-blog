const express = require('express');
const router = express.Router();
const ArticleModel = require('../models/articles');
const moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');

function asyncHandler(cb){
  return async (req,res,next)=> {
    try {
      await cb(req,res,next);
    } catch(err){
      res.render('error', {error:err});
    }
  }
}


// GET/ Article
router.get('/', asyncHandler(async(req, res) => {

       await ArticleModel.find({})
       .sort({date: 1})
       .exec(function(err, results, ) {  
       return res.render('blog', {results}) 
    })
  }));

// GET/ Article:id
router.get('/:id', asyncHandler(async(req, res) => {
  const { id } = req.params;
     await ArticleModel.findOne({id}).exec(function(err, result) {  
     return res.render('articles/posts', { result }) 
  }) 
}));

// GET/ Article
router.get('/:id/edit', ensureAuthenticated, asyncHandler(async(req, res) => {
  const { id } = req.params;
  return res.render('articles/edit', {id}) 

}));

// post/ Article:id/edit
router.post('/:id/edit',  asyncHandler( async(req, res) => {
    const { id } = req.params;
    const format = function publishedAt() {
      const date = moment(Date.now()).format('YYYY', 'MMMM', 'D');
      return date; 
    }
    dateFormat = format(Date.now());
  try{
      await ArticleModel.findOneAndUpdate({id},  { 
          title : req.body.title,
          author : req.body.author,
          body : req.body.article,
          date: dateFormat
      }, {useFindAndModify: false})  
      req.flash('success', 'Article updated');
      res.redirect('/blog')
  } catch {
    return next(err)
  }
  
}));

router.get('/:id/delete', ensureAuthenticated, asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    await ArticleModel.findOne({id}).exec(function(err, result) {  
    return res.render('articles/delete', { result, id }) 
 }) 
}));

//POST /Blog/:id/delete
router.post('/:id/delete', asyncHandler(async(req, res, next) => {
  const { id } = req.params;
    await ArticleModel.findOneAndDelete(id)  
      res.redirect('/blog')   
}));

module.exports = router;
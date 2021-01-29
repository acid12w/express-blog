const express = require('express');
const router = express.Router();
const ArticleModel = require('../models/articles');
const moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');


// GET/ Article
router.get('/', async(req, res) => {

       await ArticleModel.find({})
       .sort({date: 1})
       .exec(function(err, results, ) {  
       return res.render('blog', {results}) 
    })
  });

// GET/ Article:id
router.get('/:id', async(req, res) => {
  const { id } = req.params;
     await ArticleModel.findOne({id}).exec(function(err, result) {  
     return res.render('articles/posts', { result }) 
  }) 
});

// GET/ Article
router.get('/:id/edit', ensureAuthenticated, async(req, res) => {
  const { id } = req.params;
  return res.render('articles/edit', {id}) 

});

// post/ Article:id/edit
router.post('/:id/edit',  async(req, res) => {
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
  
});

router.get('/:id/delete', ensureAuthenticated, async(req, res, next) => {
    const { id } = req.params;
    await ArticleModel.findOne({id}).exec(function(err, result) {  
    return res.render('articles/delete', { result, id }) 
 }) 
});

//POST /Blog/:id/delete
router.post('/:id/delete', async(req, res, next) => {
  const { id } = req.params;
    await ArticleModel.findOneAndDelete(id)  
      res.redirect('/blog')   
});

module.exports = router;
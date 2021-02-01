const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

function asyncHandler(cb){
  return async (req,res,next)=> {
    try {
      await cb(req,res,next);
    } catch(err){
      res.render('error', {error:err});
    }
  }
}
  
//Get /login
router.get('/login', forwardAuthenticated, function(req, res, next){
  return res.render('login', { title: 'login' });
})

//POST /login
router.post('/login', (req, res, next) =>{
  passport.authenticate('local', { 
    successRedirect: '/blog',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});

//Get /login
router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/blog');
})


// GET /register
router.get('/register', forwardAuthenticated, function(req, res, next) {
  res.render("register", {title: 'Sign Up'});
});
// POST /register
router.post('/register', function(req, res, next) {
  
  
   const email = req.body.email 
   const name = req.body.name 
   const password = req.body.password 
   const confirmPassword = req.body.confirmPassword

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);


    let errors = req.validationErrors();

    if (errors) {
      res.render('register', {
        errors: errors
      });
    } else {
      var userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };
   
      //user schemas create method to insert document into Mongo
      User.create(userData, function(error, user){
        req.flash('success', 'You are now regidtered and can log in')
        res.redirect('/login');
      });
    }
}); 


module.exports = router; 
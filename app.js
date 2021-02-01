const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var flash = require('connect-flash');
const path = require('path');
const expressValidator = require('express-validator');

const mainRoutes = require('./routes/index');
const blogRoutes = require('./routes/Articles');
const userRoutes = require('./routes/user');


const app = express();
const port = 3000

// Passport config
require('./config/passport')(passport);

// Mongodb Connection
mongoose.connect('mongodb+srv://m220js-student:m001-mongodb-basics@mflix.xlq61.mongodb.net/bookworm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

// Use session for tracking logins
app.use(session({
  secret: 'hate everything',
  resave: true,
  saveUninitialized: true,
  // store: new MongoStore({
  //   mongooseConnection: db
  // })
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null
  next();
});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serve static files from /public
app.use(express.static('public'))
app.use(express.static('files'))

// include routes
app.use( '/', mainRoutes);
app.use('/blog', blogRoutes); 
app.use('/user', userRoutes); 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


 
// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)  
}); 




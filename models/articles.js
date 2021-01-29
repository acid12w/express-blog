var mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

     id: {
        type: Number,
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
      body: { 
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
        trim: true
      },
      date: {
        type: Date,
        default: Date.now(),
        required: true,
        
      },
   
});

//Short Description method
ArticleSchema.methods.shortDescription = function (body, num) {
  const shortDesc = this.body.length > num ? this.body.substring(0 , num) + '...' : this.body;
  return shortDesc;
};


const ArticleModel = mongoose.model('Articles', ArticleSchema);
module.exports = ArticleModel;


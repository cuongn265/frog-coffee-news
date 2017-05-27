let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let DiscussionSchema = new Schema({
  article_id: {
    type: ObjectId,
    ref: 'articles'
  },
  comments: [
    {
      user_id: {
        type: ObjectId,
        ref: 'users'
      },
      text: {
        required: true,
        type: String,
      },
      date: Date
    }
  ]
})

let Discussion = mongoose.model('discussions', DiscussionSchema);

module.exports = Discussion;

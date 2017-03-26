let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let CommentSchema = new Schema({
    article_id: ObjectId,
    created_by: ObjectId,
    date: Date,
    content: String,
});

let Comment = mongoose.model('comments', CommentSchema);

/** Comment model */
module.exports = Comment;
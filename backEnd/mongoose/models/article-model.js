let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let ArticleSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    created_by: ObjectId,
    date: Date,
    header_image: String,
    content: String,
    author: String,
    source: String,
    upvoters: [],
    downvoters: [],
    published: Boolean,
    deleted_at: Date,
    category: {type: ObjectId, required: true}
});

let Article = mongoose.model('articles', ArticleSchema);

module.exports = Article; 




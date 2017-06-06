let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    created_by: {
        type: ObjectId,
        ref: 'users'
    },
    date: Date,
    header_image: String,
    content: String,
    author: String,
    source: String,
    published: Boolean,
    deleted_at: Date,
    category: {
        type: ObjectId,
        required: true,
        ref: 'categories'
    },
    tags: [{
        tag_id: {
            type: ObjectId,
            ref: 'tags'
        },
        name: String
    }],
    visit_count: {
        type: Number,
        default: 0
    },
    comment_count: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    }
});

let Article = mongoose.model('articles', ArticleSchema);

module.exports = Article;
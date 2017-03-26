let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectId = Schema.ObjectId;

let TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    articles: [{
        type: ObjectId,
        ref: 'articles'
    }]
});

let Tag = mongoose.model('tags', TagSchema);
module.exports = Tag;
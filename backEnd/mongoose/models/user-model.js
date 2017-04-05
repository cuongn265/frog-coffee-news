let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
    user_metadata: {
        first_name: String,
        last_name: String,
        phone: String
    },
    profile_image: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    facebook: String,
    twitter: String,
    googleplus: String,
    enabled: Boolean,
    verified: Boolean,
    role: {
        type: ObjectId,
        ref: 'roles'
    },
    last_seen: Date,
    categories_track: [{
        category: {
            type: String,
            ref: 'categories'
        },
        visit_time: Number,
        last_visit: Date,
        comment_count: Number,
        bookmark_count: Number
    }]
});

let User = mongoose.model('users', UserSchema);

module.exports = User;
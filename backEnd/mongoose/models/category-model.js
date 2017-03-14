let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let CategorySchema = new Schema({
    name: {type: String, required: true},
    description: String
});

let Category = mongoose.model('categories', CategorySchema); 

module.exports = Category;





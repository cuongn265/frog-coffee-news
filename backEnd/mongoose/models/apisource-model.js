let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let ApiSourceSchema = new Schema({
    name: String,
    link: String
});

let APISources = mongoose.model('apisources', ApiSourceSchema); 

module.exports = APISources;





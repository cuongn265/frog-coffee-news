let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
   first_name: {type: String, required: true},
   last_name: {type: String, required: true},
   password: {type: String, required: true},
   email: {type: String, required: true},
   phone: String,
   facebook: String,
   twitter: String,
   googleplus: String,
   enable: Boolean,
   role: [{type:ObjectId, ref: 'roles'}],
});

//role: [{type: ObjectId, ref: 'roles'}]
let User = mongoose.model('users', UserSchema); 


module.exports = User;





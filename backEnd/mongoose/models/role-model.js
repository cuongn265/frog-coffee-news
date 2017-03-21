let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RoleSchema = new Schema({
    name: String,
    description: String
});

let Role = mongoose.model('roles', RoleSchema);

module.exports = Role;
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

let Schema = mongoose.Schema

let NotificationTypesSchema = new Schema({
    type: String,
    templateMessage: String
})

let NotificationType = mongoose.model('notification-types',NotificationTypesSchema);

module.exports = NotificationType

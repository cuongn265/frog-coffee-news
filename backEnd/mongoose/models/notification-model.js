let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;


let NotificationSchema = new Schema({
  recipient: {
    type: ObjectId,
    ref: 'users'
  },
  sender: {
    type: ObjectId,
    ref: 'users'
  },
  article_id: {
    type: ObjectId,
    ref: 'articles'
  },
  category_id: {
    type: ObjectId,
    ref: 'categories'
  },
  message: String,
  seen: Boolean,
  read: Boolean,
  date: Date
});

let Notification = mongoose.model('notifications', NotificationSchema);

module.exports = Notification;
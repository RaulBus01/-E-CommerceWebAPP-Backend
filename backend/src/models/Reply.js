const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  questionId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isDistributor: {
    type: Boolean,
    default: false
  }
  
});
const Reply  = mongoose.model('Reply', replySchema);
module.exports = Reply;


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
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
}, {timestamps: true});

questionSchema.virtual('replies',{
    ref: 'Reply',
    localField: '_id',
    foreignField: 'questionId'
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;


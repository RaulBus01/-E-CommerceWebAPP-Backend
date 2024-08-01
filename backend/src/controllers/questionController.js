const Question = require('../models/Question');
const Reply = require('../models/Reply');
const Product = require('../models/Product');
const { default: mongoose } = require('mongoose');

exports.addQuestion = async (req, res) => {
        const newQuestion = new Question({
            user: req.user.id,
            productId: req.body.productId,
            content: req.body.content,
        });
        try {   
            const savedQuestion = await newQuestion.save();
            const populatedQuestion = await Question.findById(savedQuestion._id).populate('user', 'name email role');
            res.status(200).json(populatedQuestion);
        } catch (err) {
            res.status(500).json(err);
        }
}
exports.addReply = async (req, res) => {
    const newReply = new Reply({
        user: req.user.id,
        questionId: req.body.questionId,
        content: req.body.content,
    });
    try {
        const savedReply = await newReply.save();
        const populatedReply = await Reply.findById(savedReply._id).populate('user', 'name email role');
        res.status(200).json(populatedReply);
    } catch (err) {
        res.status(500).json(err);
    }

}
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req
            .body.id, {
            $set: req.body,
        }, { new: true });
        if (!updatedQuestion) {
            res.status(404).json("Question not found");
            return;
        }
        res.status(200).json(updatedQuestion);

    } catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteQuestion = async (req, res) => {
        try {
            const questionId = req.body.questionId;
            const result = await Question.findByIdAndDelete(questionId);
            await mongoose.model('Reply').deleteMany({questionId});
            if (!result) {
                res.status(404).json("Question not found");
                return;
            }
            res.status(200).json("Question and its replies have been deleted");
        }
        catch (err) {
            res.status(500).json(err);
        }
}
exports.deleteReply = async (req, res) => {
    try {
        const result = await Reply.findByIdAndDelete
            (req.body.replyId);
        if (!result) {
            res.status(404).json("Reply not found");
            return;
        }
        res.status(200).json("Reply has been deleted");
    }catch (err) {
        res.status(500).json(err);
    }
}
exports.getQuestionByProduct = async (req, res) => {
    try { 
        const questions = await Question.find({ productId: req.params.productId }).populate("replies").populate("user", "name role");
        if(!questions){
            return res.status(404).json("Product has no questions");
        }
        const processedQuestions = questions.map(question => ({
            id: question._id,
            content: question.content,
            user: question.user._id.toString(),
            replies: question.replies.map(reply => ({
                id: reply._id,
                content: reply.content,
                user: reply.user._id.toString(),
                isDistributor: reply.isDistributor,
                createdAt: reply.createdAt,
                updatedAt: reply.updatedAt
            })),
            createdAt: question.createdAt,
            updatedAt: question.updatedAt

        }));
        res.status(200).json(processedQuestions);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
}
exports.getQuestionByUser = async (req, res) => {
    try {
        console.log(req.user);
        let questions = null;
        if(req.user.role === "admin" || (req.user.role === "customer" && req.user.id === req.params.userId)){
            questions = await Question.find({ user: req.params.userId }).populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } } 
            });
        }
        if((req.user.role === "customer" && req.user.id !== req.params.userId) || (req.user.role === "distributor")){
            return res.status(500).json("You are not allowed to see this user's questions");
        }
        if (!questions) {
            return res.status(404).json("No questions found for this user");
        }
        const processedQuestions = questions.map(question => ({
            id: question._id,
            content: question.content,
            user: question.user.toString(),
            replies: question.replies.map(reply => ({
                id: reply._id,
                content: reply.content,
                user: reply.user.toString(),
                isDistributor: reply.isDistributor,
                createdAt: reply.createdAt,
                updatedAt: reply.updatedAt
            })),
            createdAt: question.createdAt,
            updatedAt: question.updatedAt
        }));
        res.status(200).json(processedQuestions);
        
    } catch (err) {
        res.status(500).json(err);
    }
}
// exports.getQuestionByDistributor = async (req, res) => {
//     try {
//         const products = await Product.find({ distributorId: req.params.id });
//         const productIds = products.map(product => product._id);
//         const questions = await Question.find({ productId: { $in: productIds } }).populate("replies").sort({ createdAt: -1 });
//         res.status(200).json(questions);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// }
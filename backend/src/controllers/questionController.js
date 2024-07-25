const Question = require('../models/Question');
const Reply = require('../models/Reply');

exports.addQuestion = async (req, res) => {
    
        const newQuestion = new Question(req.body);
        try {
            
            const savedQuestion = await newQuestion.save();
            res.status(200).json(savedQuestion);
        } catch (err) {
            res.status(500).json(err);
        }
}
exports.addReply = async (req, res) => {
    const newReply = new Reply(req.body);
    try {
        const savedReply = await newReply.save();
        res.status(200).json(savedReply);
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
            const result = await Question.findByIdAndDelete(req.body.id);
            if (!result) {
                res.status(404).json("Question not found");
                return;
            }
            res.status(200).json("Question has been deleted");
        }
        catch (err) {
            res.status(500).json(err);
        }
}
exports.deleteReply = async (req, res) => {
    try {
        const result = await Reply.findByIdAndDelete
            (req.body.id);
        if (!result) {
            res.status(404).json("Reply not found");
            return;
        }
        res.status(200).json("Reply has been deleted");
    }catch (err) {
        res.status(500).json(err);
    }
}
exports.getQuestion = async (req, res) => {
    try {
        const questions = await Question.find({ productId: req.params.productId })
            .populate({
                path: 'replies',
                options: { sort: { createdAt: -1 } } 
            });
        
        
        const processedQuestions = questions.map(question => ({
            id: question._id,
            content: question.content,
            userId: question.userId,
            replies: question.replies.map(reply => ({
                id: reply._id,
                content: reply.content,
                userId: reply.userId,
                isDistributor: reply.isDistributor,
                createdAt: reply.createdAt
            }))

        }));


        res.status(200).json(processedQuestions);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
}
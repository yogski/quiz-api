exports.requestBody = (req, res, next) => {
    if(!req.body.lang) {
        return res.status(400).send({
            message: "lang field is required. Allowed entry: id (Bahasa Indonesia), en (English), or others."
        });
    }
    if(!req.body.type) {
        return res.status(400).send({
            message: "type field is required. Allowed entry: wordgame, trivia, jokes, or others."
        });
    }
    if(!req.body.question) {
        return res.status(400).send({
            message: "question field is required."
        });
    }
    if(!req.body.answer) {
        return res.status(400).send({
            message: "answer field is required."
        });
    }

    next();
}

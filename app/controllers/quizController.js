const Quiz = require("../models/Quiz.js");

// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Quiz
  const quiz = new Quiz({
    question: req.body.question,
    answer: req.body.answer,
    lang: req.body.lang,
    type: req.body.type
  });

  // Save Quiz in the database
  Quiz.create(quiz, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quiz."
      });
    else return res.send(data);
  });
};

// Find a single Quiz randomly
exports.findOneRandom = (req, res) => {
  Quiz.findOneRandom(req.query,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Cannot get quiz`
        });
      } else {
        return res.status(500).send({
          message: `Error. Cannot get quiz.`
        });
      }
    }
    
    res.status(200).send(data);
  });
};

// Find a single Quiz randomly
exports.findAll = (req, res) => {
  Quiz.findAll((err, data) => {
    if (err) {
        return res.status(500).send({
          message: "Error retrieving Quizzes"
        });
    } else return res.send(data);
  });
};

// Find a single Quiz with a quizId
exports.findOne = (req, res) => {
  Quiz.findOne(req.params.quizId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Quiz with id ${req.params.quizId}.`
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving Quiz with id " + req.params.quizId
        });
      }
    } else return res.send(data);
  });
};

// Update a Quiz identified by the quizId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Quiz.update(
    req.params.quizId,
    new Quiz(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Not found Quiz with id ${req.params.quizId}.`
          });
        } else {
          return res.status(500).send({
            message: "Error updating Quiz with id " + req.params.quizId
          });
        }
      } else return res.send(data);
    }
  );
};

// Delete a Quiz with the specified quizId in the request
exports.delete = (req, res) => {
  Quiz.remove(req.params.quizId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Quiz with id ${req.params.quizId}.`
        });
      } else {
        return res.status(500).send({
          message: "Could not delete Quiz with id " + req.params.quizId
        });
      }
    } else return res.send({ message: `Quiz was deleted successfully!` });
  });
};

const Quiz = require("../models/Quiz.js");

// Create and Save a new Quiz
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Quiz
  const quiz = new Quiz({
    question: req.body.question,
    answer: req.body.answer,
  });

  // Save Quiz in the database
  Quiz.create(quiz, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quiz."
      });
    else res.send(data);
  });
};

// Find a single Quiz randomly
exports.findOneRandom = (req, res) => {
  Quiz.findOneRandom((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quiz with id ${req.params.quizId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Quiz with id " + req.params.quizId
        });
      }
    } else res.send(data);
  });
};

// Find a single Quiz with a quizId
exports.findOne = (req, res) => {
  Quiz.findOne(req.params.quizId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quiz with id ${req.params.quizId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Quiz with id " + req.params.quizId
        });
      }
    } else res.send(data);
  });
};

// Update a Quiz identified by the quizId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
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
          res.status(404).send({
            message: `Not found Quiz with id ${req.params.quizId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Quiz with id " + req.params.quizId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Quiz with the specified quizId in the request
exports.delete = (req, res) => {
  Quiz.remove(req.params.quizId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Quiz with id ${req.params.quizId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Quiz with id " + req.params.quizId
        });
      }
    } else res.send({ message: `Quiz was deleted successfully!` });
  });
};

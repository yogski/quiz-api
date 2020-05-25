const express = require("express");
const quiz = require("../controllers/quizController.js");
const validator = require("../middlewares/requestBodyValidator");
var quizRouter = express.Router();

  // ACCESSIBLE ROUTES
  // Create a new quiz entry
  quizRouter.post("/quiz", validator.requestBody, quiz.create);

  // Get a single Quiz in random fashion
  quizRouter.get("/quiz", quiz.findOneRandom);

  // Get a single Quiz with quizId
  quizRouter.get("/quiz/:quizId", quiz.findOne);
  
  // LIMITED ROUTES
  // Get all quizzes
  quizRouter.get("/quiz/all", quiz.findAll);

  // Update a Quiz with quizId
  quizRouter.put("/quiz/:quizId", validator.requestBody, quiz.update);

  // Delete a Quiz with quizId
  quizRouter.delete("/quiz/:quizId", quiz.delete);
  
module.exports = quizRouter;

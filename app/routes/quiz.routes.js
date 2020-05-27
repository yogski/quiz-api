const express = require("express");
const quiz = require("../controllers/quizController.js");
const validator = require("../middlewares/requestBodyValidator");
const auth = require("../middlewares/authMiddleware")
var quizRouter = express.Router();

  //use auth
  quizRouter.use(auth.validateApiKey)
  //quizRouter.use(auth.checkApiUsage)
  
  // ACCESSIBLE ROUTES
  // Create a new quiz entry
  quizRouter.post("/quiz", validator.requestBody, quiz.create);

  // Get a single Quiz in random fashion
  quizRouter.get("/quiz", quiz.findOneRandom);

  // Get a single Quiz with quizId
  quizRouter.get("/quiz/:quizId", quiz.findOne);
  
  // LIMITED ROUTES
  // Get all quizzes
  quizRouter.get("/quiz/all", auth.hasLevelTwo, quiz.findAll);

  // Update a Quiz with quizId
  quizRouter.put("/quiz/:quizId", auth.hasLevelTwo, validator.requestBody, quiz.update);

  // Delete a Quiz with quizId
  quizRouter.delete("/quiz/:quizId", auth.hasLevelTwo, quiz.delete);
  
module.exports = quizRouter;

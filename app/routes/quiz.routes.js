const express = require("express");
const quiz = require("../controllers/quizController.js");
const validator = require("../middlewares/requestBodyValidator");
const auth = require("../middlewares/authMiddleware")
var quizRouter = express.Router();

  //use auth
  quizRouter.use(auth.validateApiKey)
  //quizRouter.use(auth.checkApiUsage)
  
  // ACCESSIBLE ROUTES
/**
 * @api {post} /quiz Submit a quiz entry
 * @apiVersion 0.1.0
 * @apiName SubmitQuizEntry
 * @apiGroup Quiz
 *
 * @apiParam {String} api_key Mandatory API key
 * @apiParam {String} question  Body: question field
 * @apiParam {String} answer  Body: answer field
 * @apiParam {String="id","en","others"} lang  Body: language field (available: id, en, others)
 * @apiParam {String="wordgame","jokes","trivia","others"} type  Body: type of quiz (available:  
 * @apiParamExample {json} Request-Example:
 *              { 
 *                "question": "What is a question?",
 *                "answer": "One that has answer",
 *                "lang": "en",
 *                "type": "trivia" 
 *              }
 *              
 * @apiSuccess {String} success Quiz has been created
 */
quizRouter.post("/quiz", validator.requestBody, quiz.create);

/**
 * @api {get} /quiz Get random quiz
 * @apiVersion 0.1.0
 * @apiName GetRandomQuiz
 * @apiGroup Quiz
 *
 * @apiParam {String} api_key Mandatory API key
 * @apiParam {String="id","en","others"} [lang]  Optional: language field (available: id, en, others)
 * @apiParam {String="wordgame","jokes","trivia","others"} [type]  Optional: type of quiz (available: wordgame, jokes, trivia, others)
 *
 * @apiSuccess {String} question Quiz question.
 * @apiSuccess {String} answer  Quiz answer.
 */
  quizRouter.get("/quiz", quiz.findOneRandom);

/**
 * @api {get} /quiz/:id Get quiz with specific id
 * @apiVersion 0.1.0
 * @apiName GetQuizById
 * @apiGroup Quiz
 *
 * @apiParam {String} api_key Mandatory API key
 * @apiParam {String} id  Quiz Id
 *
 * @apiSuccess {Number} id Quiz Id
 * @apiSuccess {String="id","en","others"} lang Quiz language (available: id, en, others)
 * @apiSuccess {String="wordgame","jokes","trivia","others"} type Quiz type (available: wordgame, jokes, trivia, others)
 * @apiSuccess {String} question Quiz question.
 * @apiSuccess {String} answer  Quiz answer.
 */
  quizRouter.get("/quiz/:quizId", quiz.findOne);
  
  // LIMITED ROUTES
  // Get all quizzes
  quizRouter.get("/quiz/all", auth.hasLevelTwo, quiz.findAll);

  // Update a Quiz with quizId
  quizRouter.put("/quiz/:quizId", auth.hasLevelTwo, validator.requestBody, quiz.update);

  // Delete a Quiz with quizId
  quizRouter.delete("/quiz/:quizId", auth.hasLevelTwo, quiz.delete);
  
module.exports = quizRouter;

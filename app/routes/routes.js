const express = require("express");
const quiz = require("../controllers/quizController.js");
var router = express.Router();

  // Create a new quiz entry
  router.post("/quiz", quiz.create);

  // Get a single Quiz in random fashion
  router.get("/quiz", quiz.findOneRandom);

  // Get a single Quiz with quizId
  router.get("/quiz/:quizId", quiz.findOne);
  
  // Update a Quiz with quizId
  router.put("/quiz/:quizId", quiz.update);

  // Delete a Quiz with quizId
  router.delete("/quiz/:quizId", quiz.delete);

  //handling others as 404
  router.all("*", function (req, res) {
    res.status(404).send({'message': 'this resource is not available.'})
  })
  
module.exports = router;

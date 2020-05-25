const sql = require("./db.js");

// constructor
const Quiz = function(quiz) {
  this.question = quiz.question;
  this.answer = quiz.answer;
  this.lang = quiz.lang;
  this.type = quiz.type;
};

Quiz.create = (newQuiz, result) => {
  sql.query("INSERT INTO quizzes SET ?", newQuiz, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created quiz: ", { id: res.insertId, ...newQuiz });
    result(null, { id: res.insertId, ...newQuiz });
  });
};

Quiz.findOne = (quizId, result) => {
  sql.query(`SELECT * FROM quizzes WHERE id = ${quizId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found quiz: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Quiz with the id
    result({ kind: "not_found" }, null);
  });
};

Quiz.findOneRandom = (params, result) => {
  var query = "SELECT question, answer FROM quizzes";
  const existingParams = ["lang", "type"].filter(field => params[field]);

  if (existingParams.length) {
      query += " WHERE ";
      query += existingParams.map(field => `${field} = ?`).join(" AND ");
  }
  query += " ORDER BY RAND(), ID LIMIT 1"

  sql.query(query, 
    existingParams.map(field => params[field]),
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found quiz: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Quiz with the id
    result({ kind: "not_found" }, null);
  });
};

Quiz.findAll = result => {
  sql.query("SELECT question, answer FROM quizzes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("Select ALL ");
      result(null, res);
      return;
    }

    // not found Quiz with the id
    result({ kind: "not_found" }, null);
  });
};

Quiz.update = (quizId, quiz, result) => {
  sql.query(
    "UPDATE quizzes SET question = ?, answer = ? WHERE id = ?",
    [quiz.question, quiz.answer, quizId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Quiz with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated quiz: ", { id: id, ...quiz });
      result(null, { id: id, ...quiz });
    }
  );
};

Quiz.remove = (id, result) => {
  sql.query("DELETE FROM quizzes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Quiz with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted quiz with id: ", id);
    result(null, res);
  });
};

module.exports = Quiz;

const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const quizRouter = require("./app/routes/quiz.routes")
const authRouter = require("./app/routes/auth.routes")

const app = express();
const prefix = process.env.PREFIX || '';

//env setup
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//setup routes
app.use(express.static('public'));
app.use(prefix, authRouter);
app.use(prefix, quizRouter);

//start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

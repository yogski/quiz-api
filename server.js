const express = require("express");
const bodyParser = require("body-parser");
const router = require("./app/routes/routes.js")

const app = express();
const prefix = process.env.PREFIX || '';

//env setup
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup routes
app.use(prefix, router);

//start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const auth = require("../controllers/authController");
var authRouter = express.Router();

  // Create a new auth entry
  authRouter.post("/signin", auth.create);

  // Get a single Auth with authId
  authRouter.get("/auth", auth.findOne);


module.exports = authRouter;


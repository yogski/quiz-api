const express = require("express");
const auth = require("../controllers/authController");
var authRouter = express.Router();

/**
 * @api {post} /signin Sign In
 * @apiVersion 0.1.0
 * @apiName SignIn
 * @apiGroup Auth
 *
 * @apiParam {String} email body: email field
 * @apiParamExample {json} Request-Example:
 *              { 
 *                "email": "john.smith@somerandommail.com"
 *              }
 *              
 * @apiSuccess {String} success New API key access has been created
 */
authRouter.post("/signin", auth.create);

  // Get a single Auth with authId
  authRouter.get("/auth", auth.findOne);


module.exports = authRouter;


const Auth = require("../models/Auth.js");
const hat = require("hat");

// Create and Save a new Auth
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Auth
  const auth = new Auth({
    email: req.body.email,
    api_key: hat(256, 16),
    access_level: 1
  });

  // Save Auth in the database
  Auth.create(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Auth."
      });
    else res.status(201).send({
      message: "New user created",
      data: data
    });
  });
};

// Find a single Auth randomly
exports.findOneRandom = (req, res) => {
  Auth.findOneRandom(req.query,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cannot get auth`
        });
      } else {
        res.status(500).send({
          message: `Error. Cannot get auth.`
        });
      }
    } else res.send(data);
  });
};

// Find a single Auth randomly
exports.findAll = (req, res) => {
  Auth.findAll((err, data) => {
    if (err) {
        res.status(500).send({
          message: "Error retrieving Authzes"
        });
    } else res.send(data);
  });
};

// Find a single Auth with a authId
exports.findOne = (req, res) => {
  Auth.findOne(req.params.authId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Auth with id ${req.params.authId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Auth with id " + req.params.authId
        });
      }
    } else res.send(data);
  });
};

// Update a Auth identified by the authId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Auth.update(
    req.params.authId,
    new Auth(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Auth with id ${req.params.authId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Auth with id " + req.params.authId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Auth with the specified authId in the request
exports.delete = (req, res) => {
  Auth.remove(req.params.authId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Auth with id ${req.params.authId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Auth with id " + req.params.authId
        });
      }
    } else res.send({ message: `Auth was deleted successfully!` });
  });
};

//mongodb-compass

const express = require("express");
const User = require("../db/model/User");
const verify = require("./verify");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router();

router.post("/", verify, (req, res) => {
  if (Array.isArray(req.body)) {
    User.find()
      .where("_id")
      .in(req.body)
      .then((users) => {
        return res.send(users);
      });
  } else {
    User.find(req.body).then((users) => {
      res.json(users);
    });
  }
});

router.get("/user/:id", (req, res) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id })
    .then((users) => {
      return res.json(users);
    })
    .catch(() => {
      return res.json("no");
    });
});

module.exports = router;

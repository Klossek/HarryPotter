//mongodb-compass

const express = require("express");
const User = require("../db/model/User");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router();

router.post("/blub", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const jwt = cookies?.jwt;
  const user = await User.findOne({ jwt: jwt });
  const options = {
    httpOnly: true,
    secure: process.env.SECURE,
    Domain: "localhost",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.json(user);
});

router.get("/get", (_req, res) => {
  res.cookie({
    maxAge: 300 * 24 * 60 * 60 * 1000, //300 tage
    httpOnly: true,
    secure: process.env.SECURE, // set to true if you're using https
  }); // maxAge: 2 hours
  res.send("Get");
});

module.exports = router;

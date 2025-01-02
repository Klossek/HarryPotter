const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/model/User");
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware
const router = express.Router();

router.post("/register", async (req, res) => {
  const formdata = req.body;
  try {
    const nameExists = await User.findOne({ name: formdata.name });
    if (nameExists) {
      return res.status(400).json({ message: "Name already taken." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formdata.password, salt);
    formdata.password = hashedPassword;
    formdata.jwt = "!";
    const createdUser = await User.create(formdata);
    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
    createdUser.jwt = token;
    await createdUser.save();
    if (createdUser) {
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.SECURE === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.send(createdUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error, something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const formdata = req.body;
  try {
    const user = await User.findOne({ name: formdata.name });
    if (!user?.name) {
      return res
        .status(400)
        .json({ message: "Name: '" + formdata?.name + "' does not exist" });
    }
    const validPassword = bcrypt.compare(formdata.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.jwt = token;
    await user.save();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.SECURE === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});

router.post("/logout", async (req, res) => {
  const formdata = req.body;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.send("allready logged out");
  const jwt = cookies?.jwt;
  const options = {
    httpOnly: true,
    secure: process.env.SECURE === "production",
    Domain: process.env.CLIENT_HOST,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.clearCookie("jwt", options);
  res.send("cleared  cookies, logged out");
});

router.post("/refresh", async (req, res) => {
  const formdata = req.body;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).send();
  const jwt = cookies?.jwt;
  const user = await User.findOne({ jwt: jwt }).exec();
  const options = {
    httpOnly: true,
    secure: process.env.SECURE === "production",
    Domain: process.env.CLIENT_HOST,
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.send(user);
});

module.exports = router;

const express = require("express");
const User = require("../db/model/User");
const verify = require("./verify");

const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/avatar",
  [verify, upload.single("avatar")],
  async function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const jwt = cookies?.jwt;
    const user = await User.findOne({ jwt: jwt });
    const fs = require("fs");
    if (user?.avatar) {
      try {
        const folder = "/uploads";
        var filePath = folder + user.avatar;
        fs.unlink(filePath, (err) => {
          err ? console.log(err) : "";
        });
      } catch (error) {
        console.log("error removing old avatar", error);
      }
    }
    user.avatar = req.file.filename;
    await user.save();
    res.json(user);
  }
);

module.exports = router;

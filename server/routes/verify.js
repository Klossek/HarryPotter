const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.jwt || "";
  if (!token) {
    console.log("Access Denied");
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log("Invalid Token");
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;

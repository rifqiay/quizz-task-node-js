const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRETE_KEY_JWT);
      next();
    } else {
      res.json({
        message: "server need token",
      });
    }
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      next(res.status(400).json({ message: "Token invalid" }));
    } else if (error && error.name === "TokenExpiredError") {
      next(res.status(400).json({ message: "Token expired" }));
    } else {
      next(res.status(400).json({ message: "Token not active" }));
    }
  }
};

module.exports = protect;

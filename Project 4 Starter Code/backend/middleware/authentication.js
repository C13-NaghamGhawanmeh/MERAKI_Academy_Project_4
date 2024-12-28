const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "The token is invalid or expired",
        });
      } else {
        req.token = payload;
        // console.log("ddd", token,"\n ttt:",payload);

          next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

module.exports = authentication;

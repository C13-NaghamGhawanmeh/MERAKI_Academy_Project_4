const jwt = require("jsonwebtoken");

const authorization = (from) => {
  return (req, res, next) => {
    const isExist = req.token.role.permissions.includes(from);

    if (isExist) {
      next();
      console.log("itsssss");
      
    } else {
      return res.status(403).json({
        success: false,
        massage: "Unauthorized",
      });
    }
  };
};

module.exports = authorization;

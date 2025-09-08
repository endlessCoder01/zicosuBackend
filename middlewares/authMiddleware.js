const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const refreshHeader = req.headers["refresh"];

  // console.log("head", authHeader);
  // console.log("refresh", refreshHeader);
  const token = authHeader && authHeader.split(" ")[1];
  const refresh = refreshHeader && refreshHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied: No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (refresh) {
        jwt.verify(
          refresh,
          process.env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err)
              return res.status(403).json({ error: "Invalid Refresh token" });
            req.user = decoded;
            // console.log("honai", req.user);
            next();
          }
        );
      } else {
        return res.status(403).json({ error: "Invalid token" });
      }
    } else {
      req.user = decoded;
      // console.log("honai futi", req.user);
      next();
    }
  });
};

module.exports = authenticateToken;

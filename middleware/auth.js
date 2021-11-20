const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ msg: "Authorization denied!" });

  //  verify token
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);

    // Add user from payload
    req.user = decoded
    next();
  });

};

module.exports = auth;

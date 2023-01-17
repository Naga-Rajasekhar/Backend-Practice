const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;

  //if token is not there
  if (!token) {
    return res.status(403).send("Access Unauthorized");
  }

  //verify token
  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);
    req.decodeUser = decode;

    //extract id from token and query the db --> will do this in mega project
  } catch (error) {
    res.status(403).send("Invalid Token");
  }

  return next();
};

module.exports = auth;

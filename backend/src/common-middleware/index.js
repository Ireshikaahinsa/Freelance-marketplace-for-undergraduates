const jwt = require('jsonwebtoken');

//required signin function

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    //jwt.decode()
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next(); 
}

//only signed in Admin can create categories

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'User access Denied'});
      }
      next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin access Denied'});
  }
  next();
}

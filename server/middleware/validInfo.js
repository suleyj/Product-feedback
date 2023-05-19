module.exports = function (req, res, next) {
  const { fullname, username, password } = req.body;

  function validUsername(username) {
    return /^(?:[0-9A-Za-z]+|([._%+-])(?!\1))+$/.test(username);
  }

  if (req.path === "/register") {
    console.log(!username.length);
    if (![username, fullname, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    }
    // else if (!validUsername(username)) {
    //   return es.status(401).json("Invalid Username");
    // }
  }

  next();
};

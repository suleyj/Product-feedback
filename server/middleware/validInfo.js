module.exports = function (req, res, next) {
  const { fullname, username, password, confirm } = req.body;

  function validUsername(username) {
    return /^(?:[0-9A-Za-z]+|([._%+-])(?!\1))+$/.test(username);
  }

  if (req.path === "/register") {
    if (![username, fullname, password, confirm].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    } else if (req.file === undefined) {
      return res.status(401).json("Missing Image");
    } else if (password !== confirm) {
      return res.status(401).json("Passwords do not match");
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

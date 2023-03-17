const { verifyToken, getUserById } = require("../controllers/user.controller");

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers;
    const authHeader = header["authorization"];
    // console.log(header)
    if (authHeader) {
      // const token = authHeader.split(" ").pop();
      const token = authHeader.split(" ")[1];
      if (token) {
        // console.log("token is ", token);
        const payload = verifyToken(token);
        const user = await getUserById(payload._id);

        req.loggedInUser = user;

        next();
      } else {
        return res.status(400).send({
          error: "User is not logged in",
        });
      }
    } else {
      return res.status(400).send({
        error: "User is not logged in",
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(500).send({
      error: `${err}`,
    });
  }
}

module.exports = authMiddleware;
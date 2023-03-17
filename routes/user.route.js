const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authmiddleware");

const {
  registerUser,
  loginUser,
  verifyToken,
  getUserById,
} = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    return res.send({
      message: "Signup successful, please proceed to login",
      data: user,
    });
  } catch (err) {
    console.error("thrown error", err);

    return res.status(500).send({
      error: `${err}`,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    return res.send({
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    console.error("thrown error", err);

    return res.status(500).send({
      error: `${err}`,
    });
  }
});

module.exports = router;

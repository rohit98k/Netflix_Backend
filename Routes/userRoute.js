const express = require("express");
const { Register, Login, LoggedOut } = require("../Controllers/user");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(LoggedOut);

module.exports = router;

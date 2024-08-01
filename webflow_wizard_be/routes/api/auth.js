const router = require("express").Router();

// Controllers
const { register,login } = require("../../app/controllers/api/authcontroller");

// Middleware
const { registerValidation,loginValidation } = require("../../app/middlewares/auth");

// Routes



router.post("/login", loginValidation, login);

module.exports = router;

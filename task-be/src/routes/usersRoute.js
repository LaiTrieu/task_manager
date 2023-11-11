const router = require("express").Router();
const userController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logged-in-user", authMiddleware, userController.getLoggedInUser);

module.exports = router;

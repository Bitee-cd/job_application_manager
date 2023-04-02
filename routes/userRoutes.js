const app = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateTokenHandler = require("../middlewares/validateToken");

const router = app.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateTokenHandler, currentUser);

module.exports = router;

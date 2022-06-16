const { register, login ,userInfo,userInfoSave } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/apply",userInfoSave)
router.get("/occupied",userInfo)

module.exports = router;
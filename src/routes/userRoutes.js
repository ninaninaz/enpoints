const userController = require("../controllers/userController")

const express = require("express")
const router = express.Router()

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/all", userController.getUsers)
router.get("/:id", userController.getUser)
router.put("/:id", userController.putUser)
router.delete("/:id", userController.delete)

module.exports = router

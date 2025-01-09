const authMiddleware = require("../middleware/authMiddleware.js")
const userController = require("../controllers/userController")

const express = require("express")
const router = express.Router()

router.use(authMiddleware)

router.get("/all", userController.getUsers)
router.get("/:id", userController.getUser)
router.put("/:id", userController.putUser)
router.delete("/:id", userController.delete)

module.exports = router

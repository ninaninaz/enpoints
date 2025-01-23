const verifyToken = require("../middleware/authMiddleware")

const messagesController = require("../controllers/messagesController.js")

const express = require("express")
const router = express.Router()

router.use(verifyToken)
router.get("/conversations/", messagesController.getConversations)
router.get("/", messagesController.getMessages)
router.post("/", messagesController.createConversation)
router.delete("/messages/", messagesController.deleteMessage)

module.exports = router

const Message = require("../models/Message")

const messagesController = {
    getConversations: async (req, res) => {
        const user_id = req.user.id

        try {
            const conversations = await Message.find({ participants: user_id })
            res.status(200).json(conversations)
        } catch (e) {
            res.sendStatus(400)
            console.log(e)
        }
    },
    getMessages: async (req, res) => {},
    createConversation: async (req, res) => {
        const { participants, message } = req.body
        const user_id = req.user.id

        const newConversation = new Message({
            participants: participants,
            conversation: [{ sentBy: user_id, data: message }]
        })
        const conversation = await newConversation.save()

        res.sendStatus(200)
    },
    deleteMessage: async (req, res) => {}
}

module.exports = messagesController

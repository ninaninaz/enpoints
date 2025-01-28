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
    getAllConversations: async (req, res) => {
        try {
            const messages = await Message.find()
            res.status(200).json(messages)
        } catch {
            res.status(500).json("Serverfel")
        }
    },
    createConversation: async (req, res) => {
        const { participants, message } = req.body
        const user_id = req.user.id

        const newConversation = new Message({
            participants: participants,
            conversation: [{ sentBy: user_id, data: message }]
        })
        const conversation = await newConversation.save()

        res.status(200).json(conversation)
    },
    deleteMessage: async (req, res) => {
        try {
            const message = await Message.findById(req.params.id)
            if (!message) {
                return res.status(404).json({ error: 'Meddelandet kunde inte hittas' })
            }
            await message.deleteOne()
            res.status(200).json({ message: 'Konversation raderad' })
        } catch(error) {
            console.log(error)
            res.status(500).json({ error: 'Serverfel'})
        }
    },
    addMessageToConversation: async (req, res) => {
        try {
            const user_id = req.user.id
            const message = req.body.message
            const conversation = await Message.findById(req.params.id)
            
            if (!conversation) {
                return res.status(404).json({ error: 'Konversationen kunde inte hittas' })
            }
            conversation.conversation.push({
                sentBy: user_id,
                data: message
            })
            await conversation.save();
            
            res.status(200).json(conversation)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Serverfel' })
        }
    }
}

module.exports = messagesController

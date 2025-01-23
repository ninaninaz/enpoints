const mongoose = require("mongoose")

const MessagesSchema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true
    },
    conversation: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Messages", MessagesSchema)

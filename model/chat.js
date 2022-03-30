const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    chatroom: {
        type: String,
        required: true
    },

    user_email: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
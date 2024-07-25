const express = require('express')
const Authentication = require('../middleware/authentication');
const ChatUserController = require('../controllers/chat_user.controller');
const router = express.Router()

router.post('/chat/users/list', Authentication.Authenticate, ChatUserController.getChatList)
router.post('/chat/users/create', Authentication.Authenticate, ChatUserController.create)

module.exports = router
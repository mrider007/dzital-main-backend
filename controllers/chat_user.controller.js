const ChatUser = require("../models/chat_user.model");
const ChatUserRepo = require("../repositories/chat_user.repository");

class ChatUserController {
    constructor() { }

    async create(req, res) {
        try {
            req.body.user1_id = req.user._id
            const isExist = await ChatUser.findOne({
                $or: [
                    {
                        $and: [
                            { user1_id: req.body.user1_id },
                            { user2_id: req.body.user2_id }
                        ]
                    },
                    {
                        $and: [
                            { user2_id: req.body.user1_id },
                            { user1_id: req.body.user2_id }
                        ]
                    },
                ]
            });

            if (_.isEmpty(isExist) || !isExist._id) {
                const saveData = await ChatUser.create(req.body);
                if (_.isEmpty(saveData) || !saveData._id) {
                    res.status(400).send({ status: 400, message: "can not save chat list history" })
                } else {
                    res.status(200).send({ status: 200, message: 'Chat List History Updated', data: saveData })
                }
            } else {
                res.status(200).send({ status: 200, message: 'Chat List Already Exist', data: isExist })
            }

        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async getChatList(req, res) {
        try {
            const chatList = await ChatUserRepo.list(req);
            if (_.isEmpty(chatList) || !chatList) {
                res.status(400).send({ status: 400, message: 'No Chat Record Found!' })
            } else {
                res.status(200).send({ status: 200, message: 'Your Chat List Found', data: chatList })
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message })
        }
    }
}

module.exports = new ChatUserController();
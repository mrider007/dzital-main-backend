const { RtcTokenBuilder, RtcRole } = require("agora-token");
const RoomModel = require("../models/room.model");
const crypto = require("crypto");

class RoomController {
    constructor() { }

    async createRoom(req, res) {
        try {
            if (!_.has(req.body, 'members')) {
                return res.status(400).send({ status: 400, message: "Members is Required" });
            }
            const userId = req.user._id
            const agoraAppId = process.env.AGORA_APP_ID;
            const agoraAppCertificate = process.env.AGORA_APP_PROJECT_ID;
            const members = req.body?.members
            const room_type = req.body?.room_type || 'audio'
            const role = RtcRole.PUBLISHER
            const tokenExpirationInSeconds = 3600;
            const privilegeExpirationInSeconds = 3600;
            const channelName = crypto.randomBytes(8).toString('hex');

            if (!members || !Array.isArray(members) || members.length === 0) {
                return res.status(400).send({ status: 400, message: "Invalid User Id" });
            }

            const token = RtcTokenBuilder.buildTokenWithUid(agoraAppId, agoraAppCertificate, channelName, userId, role, tokenExpirationInSeconds, privilegeExpirationInSeconds)

            if (token) {
                const newRoom = await RoomModel.create({ channelName, creator: userId, room_type, token, members });
                res.status(200).json({ status: 200, message: 'Token Generated Successfully', data: newRoom, exptimeinsec: tokenExpirationInSeconds });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to Generate Token', data: null });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new RoomController();
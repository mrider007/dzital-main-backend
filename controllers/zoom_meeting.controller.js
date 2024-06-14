const ZoomToken = require('../models/zoom_token.model');
const meeting_service = require('../services/meeting_service');

class MeetingController {
    constructor() {
        this.createMeeting = this.createMeeting.bind(this);
    }

    async createMeeting(req, res) {
        try {
            const zoomToken = await ZoomToken.findOne({})
            if (!_.isEmpty(zoomToken) && zoomToken?._id) {
                const expirationTime = new Date(zoomToken.updatedAt + zoomToken.exp * 1000);
                const currentTime = new Date();
                if (currentTime < expirationTime) {
                    const data = await meeting_service.create_meeting(req, zoomToken.access_token)
                    res.status(200).send({ status: 200, data, message: "Meeting Created Successfully" });
                } else {
                    const newToken = await meeting_service.refreshToken(zoomToken)
                    if (newToken) {
                        const data = await meeting_service.create_meeting(req, newToken)
                        res.status(200).send({ status: 200, data, message: "Meeting Created Successfully" });
                    } else {
                        res.status(400).send({ status: 400, message: `Meeting can't be Created`, data: {} });
                    }
                }
            } else {
                res.status(400).send({ status: 400, message: `Meeting can't be Created`, data: {} });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    };
}

module.exports = new MeetingController();
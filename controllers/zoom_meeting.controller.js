const Meeting = require('../models/meeting.model');
const membership_user = require('../models/membership_user.model');
const ZoomToken = require('../models/zoom_token.model');
const MeetingRepo = require('../repositories/zoom_meeting.repository');
const meeting_service = require('../services/meeting_service');

class MeetingController {
    constructor() {
        this.createMeeting = this.createMeeting.bind(this);
    }

    async createMeeting(req, res) {
        try {
            if (!req.body.product_id) {
                return res.status(404).send({ status: 404, message: "product not found" })
            }

            const check_membership = await membership_user.find({ user_id: req.user._id }).populate('membership_id')
            const membership = check_membership?.find((data) => data.membership_id?.type === 'Zoom')
            const currentDate = new Date()
            if (!membership || membership.membership_status !== 'Active' || membership.membership_end_date < currentDate) {
                return res.status(400).send({ status: 400, message: 'you do not have membership to use this feature', data: {} });
            }

            const zoomToken = await ZoomToken.findOne({})

            if (_.isEmpty(zoomToken) || !zoomToken._id) {
                return res.status(400).send({ status: 400, message: 'Meeting can not be created', data: {} });
            }
            // console.log(zoomToken)
            const expirationTime = new Date(zoomToken.updatedAt + zoomToken.exp * 1000);
            const currentTime = new Date();

            if (currentTime < expirationTime) {
                const data = await meeting_service.create_meeting(req, zoomToken.access_token)
                if (data) {
                    const saveMeeting = await Meeting.create({
                        product_id: req?.body?.product_id,
                        duration: data?.duration,
                        meeting_agenda: data?.agenda,
                        meeting_join_url: data?.join_url,
                        meeting_password: data?.password,
                        meetingAt: data?.start_time,
                        meeting_start_url: data?.start_url
                    })
                    res.status(200).send({ status: 200, data: saveMeeting, message: "meeting created successfully" });
                } else {
                    res.status(400).send({ status: 400, message: 'Meeting can not be created', data: {} });
                }
            } else {
                const newToken = await meeting_service.refreshToken(zoomToken)
                if (newToken) {
                    const data = await meeting_service.create_meeting(req, newToken)
                    if (data) {
                        const saveMeeting = await Meeting.create({
                            product_id: req?.body?.product_id,
                            duration: data?.duration,
                            meeting_agenda: data?.agenda,
                            meeting_join_url: data?.join_url,
                            meeting_password: data?.password,
                            meetingAt: data?.start_time,
                            meeting_start_url: data?.start_url
                        })
                        res.status(200).send({ status: 200, data: saveMeeting, message: "meeting created successfully" });
                    } else {
                        res.status(400).send({ status: 400, message: `Meeting can't be Created`, data: {} });
                    }
                } else {
                    res.status(400).send({ status: 400, message: `Meeting can't be Created`, data: {} });
                }
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    };

    async meetingList(req, res) {
        try {
            const meeting_list = await MeetingRepo.list(req);
            if (_.isEmpty(meeting_list)) {
                res.status(201).send({ status: 201, data: [], message: 'No Meeting Found' });
            } else {
                res.status(200).send({ status: 200, data: meeting_list, message: 'Meeting List Fetched Successfully' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new MeetingController();
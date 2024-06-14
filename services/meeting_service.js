const axios = require("axios");
const ZoomToken = require('../models/zoom_token.model');

const meeting_service = {

    create_meeting: async (req, token) => {
        try {
            const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
                topic: req.body.topic || "Test Meeting",
                type: 2,
                start_time: req.body.start_time || new Date(),
                duration: req.body.duration || 60,
                timezone: 'UTC',
                agenda: 'Team meeting for future videos',
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: false,
                    mute_upon_entry: true,
                    watermark: false,
                    use_pmi: false,
                    approval_type: 0,
                    audio: 'both',
                    auto_recording: 'none'
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    },

    refreshToken: async (data) => {
        try {
            const response = await axios.post('https://zoom.us/oauth/token', null, {
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: data.refresh_token
                },
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response?.data?.access_token) {
                await ZoomToken.findOneAndUpdate({ _id: data._id }, { refresh_token: response.data.refresh_token, access_token: response.data.access_token, exp: 3600 })
                return response?.data?.access_token || null
            } else {
                return null
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = meeting_service;
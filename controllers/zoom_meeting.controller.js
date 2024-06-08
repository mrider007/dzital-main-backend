const axios = require('axios');
const jwt = require('jsonwebtoken');

class MeetingController {
    constructor() {
        this.createMeeting = this.createMeeting.bind(this);
    }

    generateZoomToken() {
        const payload = {
            iss: process.env.ZOOM_API_KEY,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
        };
        return jwt.sign(payload, process.env.ZOOM_API_SECRET);
    }

    // Endpoint to create a Zoom meeting
    async createMeeting(req, res) {
        try {
            
            const token = process.env.TOKEN;

            const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
                topic: req.body.topic,
                type: 2, // Scheduled meeting
                start_time: req.body.start_time,
                duration: req.body.duration,
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

            res.json(response.data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MeetingController();
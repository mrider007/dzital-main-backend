const { ChatTokenBuilder } = require('agora-token');
require('dotenv').config();

const AgoraToken = {
    create: async () => {
        try {
            const agoraAppId = process.env.AGORA_APP_ID;
            const agoraAppCertificate = process.env.AGORA_APP_PROJECT_ID;
            let expireTimeInSeconds = 3600;

            const token = ChatTokenBuilder.buildAppToken(agoraAppId, agoraAppCertificate, expireTimeInSeconds);
            if (token) {
                return token
            } else {
                return null
            }
        } catch (error) {
            console.log(error?.message)
            return null
        }
    }
}

module.exports = AgoraToken;
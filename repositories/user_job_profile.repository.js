const mongoose = require('mongoose');
const UserJobProfile = require('../models/user_job_profile.model');

const UserJobProfileRepository = {

    save: async (data) => {
        try {
            let job_profile = await UserJobProfile.create(data);
            if (!job_profile) {
                return null;
            }
            return job_profile;
        } catch (e) {
            return e;
        }
    }

}

module.exports = UserJobProfileRepository;
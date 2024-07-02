const mongoose = require('mongoose');
const User = require('../models/user.model');
const FreelancerProposal = require('../models/freelancer_proposal.model');

class freelancerProposalController {
    constructor() { }

    async freelancerProposalPost(req, res) {
        try {
            req.body.userId = req.user._id;
            const userDetails = await User.findOne({ _id: req.user._id });
            req.body.name = userDetails.name;
            req.body.email = userDetails.email;
            req.body.mobile = userDetails.mobile;
            let proposalData = await FreelancerProposal.create(req.body);
            if (!_.isEmpty(proposalData) && proposalData._id) {
                res.status(200).send({ status: 200, data: proposalData, message: 'Freelancer Proposal Saved Successfully' });
            } else {
                res.status(400).send({ message: 'Freelancer Proposal could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new freelancerProposalController();
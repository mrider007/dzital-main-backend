const { default: mongoose } = require("mongoose");
const Meetings = require("../models/meeting.model");



const MeetingRepo = {
    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            
            if(_.has(req.body, 'product_id') && req.body.product_id !== ''){
                and_clauses.push({ 'product_id': new mongoose.Types.ObjectId(req.body.product_id) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'meeting_agenda': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                    ]
                });
            }

            if (_.isObject(req.body) && _.has(req.body, 'status')) {
                if(req.body.status === 'ongoing'){
                    and_clauses.push({
                       'status': {$get: new Date()}
                    });
                }
            }

            if(and_clauses.length > 0){
                conditions['$and'] = and_clauses;
            }

        const meeting_pipeline = Meetings.aggregate([
            {
                $match: conditions
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    pipeline: [
                        {
                            $group: {
                                _id: "$_id",
                                image: { $first: "$image" },
                                title: { $first: "$title" },
                                description: { $first: "$description" },
                                product_price: { $first: "$product_price" },
                                purchase_mode: { $first: "$purchase_mode" },
                                category_id: { $first: "$category_id" },
                                sub_category_id: { $first: "$sub_category_id" },
                            }
                        }
                    ],
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: '$product'
            },
            {
                $group: {
                    _id: "$_id",
                    meeting_agenda: { $first: "$meeting_agenda" },
                    meeting_start_url: { $first: "$meeting_start_url" },
                    meeting_join_url: { $first: "$meeting_join_url" },
                    meeting_password: { $first: "$meeting_password" },
                    meetingAt: { $first: "$meetingAt" },
                    duration: { $first: "$duration" },
                    product_details: { $first: "$product" },
                    createdAt: { $first: "$createdAt"}
                }
            },
            {
                $sort: {meetingAt: -1}
            }
        ])

        var options = {};
        if (req.body.page !== undefined) {
            options.page = req.body.page;
        }
        if (req.body.limit !== undefined) {
            options.limit = req.body.limit;
        }

        let meeting_lsit = await Meetings.aggregatePaginate(meeting_pipeline, options);
        return meeting_lsit;

        }catch (e) {
            throw e;
        }
    }
}

module.exports = MeetingRepo;
const Banner = require("../models/banner.model");
const BannerRepo = require("../repositories/banner.repository");
const cloudinary = require('cloudinary');

class BannerController {
    constructor() { }

    async newBanner(req, res) {
        try {
            if (req.files && req.files.length > 0) {
                var photo;
                for (let i = 0; i < req.files.length; i++) {
                    const element = req.files[i];
                    if (element.fieldname === 'image') {
                        photo = element.path;
                        const uploadImage = await cloudinary.v2.uploader.upload(photo);
                        req.body.image = uploadImage.secure_url;
                    }
                }
            }
            const bannerSave = await Banner.create(req.body);
            if (!_.isEmpty(bannerSave)) {
                res.status(200).send({ status: 200, data: bannerSave, message: "Banner Saved Successfully" });
            }
            else {
                res.status(400).send({ status: 400, message: "Banner could not be saved" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    };

    async getBanners(req, res) {
        try {
            const data = await BannerRepo.getAll()
            if (!_.isEmpty(data) && data.length > 0) {
                res.status(200).send({ status: 200, data: data, message: "Banner List Fetched Successfully" });
            } else {
                res.status(400).send({ status: 400, data: [], message: "No Banner Found" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    };

    async updateBanner(req, res) {
        try {
            const updateBanner = await BannerRepo.updateBanner({ _id: req.params?.id }, req.body)
            if (!_.isEmpty(updateBanner)) {
                res.status(200).send({ status: 200, data: updateBanner, message: "Banner Updated Successfully" });
            } else {
                res.status(400).send({ status: 400, message: "Banner could not be updated" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    };

    async deleteBanner(req, res) {
        try {
            const bannerInfo = await Banner.findOneAndDelete({ _id: req.params?.id })
            if (!_.isEmpty(bannerInfo)) {
                res.status(200).send({ status: 200, data: bannerInfo, message: "Banner Deleted Successfully" });
            } else {
                res.status(400).send({ status: 400, message: "Banner could not be deleted" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message })
        }
    };
}

module.exports = new BannerController();
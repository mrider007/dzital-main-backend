const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.FROM,
            to: email,
            subject: subject,
            html: text,
        });
        console.log("Email Sent Successfully");
        return transporter;
    } catch (e) {
        throw e
    }
};

module.exports = sendEmail;
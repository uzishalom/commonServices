const functions = require('firebase-functions');
const admin = require('firebase-admin');
const validateEmail = require("./utils/validate-email");
const sendMailConfig = require("./configs/sendMailConfig");
const nodemailer = require('nodemailer');


admin.initializeApp();

// Send Email
// local test: http://localhost:5001/commonservices-a50f5/us-central1/sendMail
const sendMail = functions.https.onRequest((req, res) => {

    if (!("email" in req.body && "subject" in req.body && "message" in req.body)) {
        res.json({ "err": "Missing Parameters" });
        return;
    }

    const { email, subject, message } = req.body;

    if (!validateEmail(email)) {
        res.json({ "err": "Wrong Email Format" });
        return;
    }

    if (subject.length == 0) {
        res.json({ "err": "The subject is empty" });
        return;
    }

    // sending the mail 
    const transporter = nodemailer.createTransport({
        service: sendMailConfig.serviceName,
        auth: {
            user: sendMailConfig.username,
            pass: sendMailConfig.password
        }
    });

    const mailOptions = {
        from: sendMailConfig.fromEmail,
        to: email,
        subject: subject,
        text: message
    };
    //self signed certificate in certificate chain"
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ "err": err.message })
        } else {
            console.log('Email sent: ' + result.response);
            res.json({ "status": "ok" })
        }
    });
})

module.exports = {
    sendMail,
}



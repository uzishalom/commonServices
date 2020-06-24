const functions = require('firebase-functions');
const admin = require('firebase-admin');
const validateEmail = require("./utils/validate-email");

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

    res.send("OK")
})

module.exports = {
    sendMail,
}



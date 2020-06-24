const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Send Email
// local test: http://localhost:5001/commonservices-a50f5/us-central1/sendMail
const sendMail = functions.https.onRequest((req, res) => {
    res.send("Hello From uzi second time")
})

module.exports = {
    sendMail,
}



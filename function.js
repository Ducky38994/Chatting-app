const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.notifyOnMessage = functions.database
.ref("/rooms/{roomId}/messages/{msgId}")
.onCreate(async (snap, context) => {

    const msg = snap.val();
    const roomId = context.params.roomId;

    const tokensSnap = await admin.database().ref("fcmTokens").once("value");
    if (!tokensSnap.exists()) return null;

    const tokens = [];
    tokensSnap.forEach(user =>
        user.forEach(t => tokens.push(t.key))
    );

    const payload = {
        notification: {
            title: `NODE: ${roomId}`,
            body: `${msg.name}: ${msg.text}`,
            icon: msg.avatar
        }
    };

    return admin.messaging().sendToDevice(tokens, payload);
});

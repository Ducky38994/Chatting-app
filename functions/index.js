const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.notifyOnMessage = functions.database
.ref('/chat/messages/{msgId}')
.onCreate(async (snap, context) => {
    const msg = snap.val();
    if (!msg) return null;

    const tokensSnap = await admin.database().ref('fcmTokens').once('value');
    if (!tokensSnap.exists()) return null;

    const tokens = [];
    tokensSnap.forEach(user => {
        user.forEach(t => tokens.push(t.key));
    });

    if (!tokens.length) return null;

    const payload = {
        notification: {
            title: `Chat Message from ${msg.name}`,
            body: msg.text,
            icon: 'https://via.placeholder.com/50'
        }
    };

    return admin.messaging().sendToDevice(tokens, payload);
});

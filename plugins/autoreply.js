const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ✅ Voice list එක (ඔබට මෙය සංස්කරණය කළ හැක)
const voiceList = [
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/menu.mp3'
];

// ✅ Auto Reply Trigger Message (මෙය වෙනස් කරන්න)
const triggerMessage = 'sts';

// Voice එක download කිරීමේ function එක
async function downloadVoice(url, outputPath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Auto Reply Activate/Deactivate
let autoVoiceReplyEnabled = false;

// ✅ Auto Reply Activate/Deactivate Command
cmd({
    pattern: 'autoreply',
    react: "🎤",
    desc: 'Enable or disable auto voice reply.',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        autoVoiceReplyEnabled = !autoVoiceReplyEnabled;

        if (autoVoiceReplyEnabled) {
            reply(`✅ *Auto Voice Reply Activated*.\n\nTrigger Message: *${triggerMessage}*`);
        } else {
            reply('❌ *Auto Voice Reply Deactivated.*');
        }
    } catch (error) {
        console.error('❌ Error in Auto Voice Reply:', error);
        reply('❌ Auto Voice Reply Activation Failed.');
    }
});

// ✅ Incoming Message Capture - Auto Reply
cmd({
    on: 'text',
    filename: __filename
}, async (conn, mek, m) => {
    if (!autoVoiceReplyEnabled) return;

    // Trigger message එකක්ද කියා පිරික්සීම
    if (m.text.toLowerCase() === triggerMessage.toLowerCase()) {
        try {
            const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];
            const voicePath = path.join(__dirname, '../temp', `voice_${Date.now()}.mp3`);

            // Voice එක download කර send කරන්න
            await downloadVoice(randomVoice, voicePath);
            await conn.sendMessage(m.chat, { audio: { url: voicePath }, mimetype: 'audio/mp4', ptt: true });

            // Temporary file එක delete කරන්න
            fs.unlinkSync(voicePath);
        } catch (error) {
            console.error('❌ Error in Sending Auto Voice:', error);
        }
    }
});

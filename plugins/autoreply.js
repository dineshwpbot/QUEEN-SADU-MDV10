const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const voiceList = [
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%201.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%202.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%203.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%204.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%205.mp3'
];

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

// Auto Voice Reply Activate කිරීම
let autoVoiceReplyEnabled = false;

cmd({
    pattern: 'autoreply',
    react: "🎤",
    desc: 'Auto random voice reply for all messages.',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        autoVoiceReplyEnabled = !autoVoiceReplyEnabled;

        if (autoVoiceReplyEnabled) {
            reply('✅ *Auto Random Voice Reply Activated.*');
        } else {
            reply('❌ *Auto Random Voice Reply Deactivated.*');
        }

    } catch (error) {
        console.error('❌ Error in Auto Voice Reply:', error);
        reply('❌ Auto Voice Reply Activation Failed.');
    }
});

// Incoming Message Capture
cmd({
    on: 'text',
    filename: __filename
}, async (conn, mek, m) => {
    if (!autoVoiceReplyEnabled) return;

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
});

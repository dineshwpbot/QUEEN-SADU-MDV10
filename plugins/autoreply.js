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

// Auto random voice reply
cmd({
    pattern: 'autoreply',
    react: "🎤",
    desc: 'Auto random voice reply for messages.',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        reply('✅ Auto Random Voice Reply Activated.');

        // Incoming message capture
        conn.ev.on('messages.upsert', async (message) => {
            const msg = message.messages[0];
            if (!msg.message || msg.key.fromMe) return;

            // Random voice එකක් තෝරන්න
            const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];
            const voicePath = path.join(__dirname, '../temp', `voice_${Date.now()}.mp3`);

            // Voice එක download කර send කරන්න
            await downloadVoice(randomVoice, voicePath);
            await conn.sendMessage(msg.key.remoteJid, { audio: { url: voicePath }, mimetype: 'audio/mp4', ptt: true });

            // Temporary voice file එක delete කරන්න
            fs.unlinkSync(voicePath);
        });

    } catch (error) {
        console.error('❌ Error in Auto Voice Reply:', error);
        reply('❌ Auto Voice Reply Activation Failed.');
    }
});

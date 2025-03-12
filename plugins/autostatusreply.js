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

// Auto reply when viewing status
cmd({
    pattern: 'statusAutoReply',
    react: "🎤",
    desc: 'Auto voice reply when viewing WhatsApp status.',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        reply('✅ Auto Voice Reply Activated for Status Views.');

        conn.ev.on('status.update', async (status) => {
            console.log('🟢 Status Viewed: ', status);

            const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];
            const voicePath = path.join(__dirname, '../temp', `voice_${Date.now()}.mp3`);

            await downloadVoice(randomVoice, voicePath);
            
            await conn.sendMessage(status.participant, { audio: { url: voicePath }, mimetype: 'audio/mp4', ptt: true });
            fs.unlinkSync(voicePath);
        });

    } catch (error) {
        console.error('❌ Error in Status Auto Reply:', error);
        reply('❌ Error while activating Auto Voice Reply.');
    }
});

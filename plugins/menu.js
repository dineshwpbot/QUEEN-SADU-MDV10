const { cmd, commands } = require('../command');
const config = require('../config');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');

// List of voices for random selection
const voiceList = [
    'path/to/voice1.ogg',
    'path/to/voice2.ogg',
    'path/to/voice3.ogg',
    // Add more voices as needed
];

cmd({
    pattern: "menu2",
    react: "🛸",
    alias: ["panel", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Randomly select a voice file
        const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];

        // Channel view link (example, replace with actual channel URL)
        const channelViewLink = 'https://whatsapp.com/channel/0029Vb0Anqe9RZAcEYc2fT2c';

        // Send the selected random voice message with channel view link
        await conn.sendMessage(from, { audio: { url: randomVoice }, ptt: true });

        // Create a short menu text with channel view link
        let madeMenu = `*HELLO WELCOME TO QUEEN SADU MD WHATSAPP BOT* 
        *ᴡᴇʟᴄᴏᴍᴇ ${pushname}*
        *MR DINESH OFC*
        
        📢 *JOIN OUR CHANNEL* 📢
        👉 [Channel View](${channelViewLink})
        `;

        // Send the image and menu text after voice, with channel view link
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

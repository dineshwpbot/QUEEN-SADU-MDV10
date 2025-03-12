const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

// ✅ Video capture URL (Video එක මෙහි දමන්න)
const videoUrl = 'https://files.catbox.moe/kibj2k.mp4';

// ✅ Voice clip URLs (Random එකක් යවයි)
const voiceUrls = [
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/menu.mp3',
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/hi.mp3'
];

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // ✅ Random voice එක තෝරාගන්න (Ensure proper selection)
        const randomVoice = voiceUrls[Math.floor(Math.random() * voiceUrls.length)];

        // ✅ System status message
        const status = `╭━━〔 *QUEEN-SADU-MD* 〕━━┈⊷
┃◈ *⏳ Uptime:* ${runtime(process.uptime())}
┃◈ *📟 RAM Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈ *⚙️ HostName:* ${os.hostname()}
┃◈ *👨‍💻 Owner:* ᴍʀ ᴅɪɴᴇꜱʜ
┃◈ *🧬 Version:* V2 BETA
╰────────────────────

  𝐐𝐮𝐞𝐞𝐧 𝐒𝐚𝐝𝐮 𝐢𝐬 𝐚𝐥𝐢𝐯𝐞 𝐧𝐨𝐰! 🎉

🔗 https://whatsapp.com/channel/0029Vb0Anqe9RZAcEYc2fT2c`;

        // ✅ 1. Send Video Capture Style (Fixed recorded style effect)
        const videoMessage = await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: "📹 *I'm Alive!*",
            jpegThumbnail: Buffer.from(''), // Empty buffer for capture style effect
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // 🕒 Wait 3 seconds before sending voice
        await new Promise(resolve => setTimeout(resolve, 3000));

        // ✅ 2. Send Random Voice (Ensure random works properly)
        const voiceMessage = await conn.sendMessage(from, {
            audio: { url: randomVoice },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as voice (PTT)
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: videoMessage });

        // 🕒 Wait 2 seconds before sending image
        await new Promise(resolve => setTimeout(resolve, 2000));

        // ✅ 3. Send Image + Caption (Final status message)
        await conn.sendMessage(from, {
            image: { url: 'https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg' },
            caption: status,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: voiceMessage });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`❌ *Error Occurred:* ${e.message}`);
    }
});

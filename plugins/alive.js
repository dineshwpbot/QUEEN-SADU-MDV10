const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

// Video clip URL (පළවෙනිව යවන video එක)
const videoUrl = 'YOUR_VIDEO_URL_HERE';

// Voice clip URLs (Random එකක් යවයි)
const voiceUrls = [
    'YOUR_VOICE_URL_1_HERE',
    'YOUR_VOICE_URL_2_HERE',
    'YOUR_VOICE_URL_3_HERE'
];

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Random voice එක තෝරාගන්නවා
        const randomVoice = voiceUrls[Math.floor(Math.random() * voiceUrls.length)];

        // System status message
        const status = `╭━━〔 *QUEEN-SADU-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *⏳Uptime*:  ${runtime(process.uptime())} 
┃◈┃• *📟 Ram usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *⚙️ HostName*: ${os.hostname()}
┃◈┃• *👨‍💻 Owner*: ᴍʀ ᴅɪɴᴇꜱʜ
┃◈┃• *🧬 Version*: V2 BETA
┃◈└───────────┈⊷
╰──────────────┈⊷

  𝐪𝐮𝐞𝐞𝐧 𝐬𝐚𝐝𝐮 programing.𝐢𝐦 𝐚𝐥𝐢𝐯𝐞 𝐧𝐨𝐰. 

  https://whatsapp.com/channel/0029Vb0Anqe9RZAcEYc2fT2c

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ`;

        // 1. Send Video First
        const videoMessage = await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: "🚀 *I'm Alive!*",
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Wait for 3 seconds before sending voice
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 2. Send Random Voice (PTT Voice Message)
        const voiceMessage = await conn.sendMessage(from, {
            audio: { url: randomVoice },
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: videoMessage });

        // Wait for 2 seconds before sending image + caption
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 3. Send Image + Caption After Voice
        await conn.sendMessage(from, {
            image: { url: `https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                    serverMessageId: 143
                }
            }
        }, { quoted: voiceMessage });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`❌ *Error Occurred:* ${e.message}`);
    }
});

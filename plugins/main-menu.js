const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"], use: '.menu',
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send audio (Voice Message)
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/queensadumenu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Send Channel View Image
        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg` },
                caption: `*Menu*:\n\n╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷\n┃★╭──────────────\n┃★│ Owner : *${config.OWNER_NAME}*\n┃★│ Baileys : *Multi Device*\n┃★│ Type : *NodeJs*\n┃★│ Platform : *Heroku*\n┃★│ Mode : *[${config.MODE}]*\n┃★│ Prifix : *[${config.PREFIX}]*\n┃★│ Version : *3.0.0 Bᴇᴛᴀ*\n┃★╰──────────────\n╰━━━━━━━━━━━━━━━┈⊷\n\n*Download Menu* (example)...`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106128@newsletter',
                        newsletterName: 'ᴍʀ ᴅɪɴᴇꜱʜ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

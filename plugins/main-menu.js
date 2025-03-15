const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"],
    use: '.menu',
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Voice message first with channel view link
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/queensadumenu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    title: "Join Our Channel",
                    body: "Click here to view",
                    thumbnailUrl: "https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg",
                    mediaType: 1,
                    mediaUrl: "https://whatsapp.com/channel/120363354023106128",
                    sourceUrl: "https://whatsapp.com/channel/120363354023106128"
                }
            }
        }, { quoted: mek });

        // Menu message with first line edited
        let dec = `╭━━━〔 *Convert Menu List.....* 〕━━━┈⊷
┃◈╭─────────────·๏
┃◈┃• sticker
┃◈┃• sticker2
┃◈┃• emojimix
┃◈┃• fancy
┃◈┃• take
┃◈┃• tomp3
┃◈┃• tts
┃◈┃• trt
┃◈┃• base64
┃◈┃• unbase64
┃◈┃• binary
┃◈┃• dbinary
┃◈┃• tinyurl
┃◈┃• urldecode
┃◈┃• urlencode
┃◈┃• url
┃◈┃• repeat 
┃◈┃• ask
┃◈┃• readmore
┃◈└───────────┈⊷
╰──────────────┈⊷

╭━━━〔 *${config.BOT_NAME} Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *${config.OWNER_NAME}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Platform : *Heroku*
┃★│ Mode : *[${config.MODE}]*
┃★│ Prefix : *[${config.PREFIX}]*
┃★│ Version : *3.0.0 Bᴇᴛᴀ*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
[ *Remaining Menu List Here* ]
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg` },
                caption: dec,
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

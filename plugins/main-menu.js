const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["allmenu", "fullmenu"],
    use: '.menu',
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // ✅ **Step 1: Send Voice Message First with Channel View**
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

        // ✅ **Step 2: Send Initial "Uploading Your Menu List..." Message with Channel View**
        let initialMenuMsg = `*Uploading Your Menu List...*`;
        let menuMsg = await conn.sendMessage(from, {
            image: { url: "https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg" },
            caption: initialMenuMsg,
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

        // ✅ **Step 3: Edit the Same Message to Full Menu After Few Seconds**
        setTimeout(async () => {
            let finalMenuMsg = `╭━━━〔 *${config.BOT_NAME} Menu* 〕━━━┈⊷
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

╭━━━〔 *Download List* 〕━━━┈⊷
┃◉╭─────────────·๏
┃◉┃• song
┃◉┃• video
┃◉┃• ytmp3
┃◉┃• ytmp4
┃◉┃• instagram
┃◉┃• facebook
┃◉┃• twitter
┃◉┃• tiktok
┃◉┃• mediafire
┃◉┃• pinterest
┃◉└───────────┈⊷
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 *Convert Menu List* 〕━━━┈⊷
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
╰━━━━━━━━━━━━━━━┈⊷

> ${config.DESCRIPTION}`;

            await conn.sendMessage(from, {
                edit: menuMsg.key, // ✅ **Edit the Same Message**
                image: { url: "https://i.postimg.cc/q7QwF3JS/20250309-015608.jpg" },
                caption: finalMenuMsg,
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
            });

        }, 5000); // **5 seconds later update the message**

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

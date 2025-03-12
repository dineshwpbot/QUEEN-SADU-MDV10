const { cmd, commands } = require('../command');

// Voice links (hosted MP3 URLs)
const voiceLinks = [
'https://files.catbox.moe/4i7ccz.mp3',
'https://files.catbox.moe/c0rswx.mp3',
'https://files.catbox.moe/hgyeth.mp3',
'https://files.catbox.moe/lleedr.mp3',
'https://files.catbox.moe/5q1il0.mp3',
'https://files.catbox.moe/is3w5r.mp3',
'https://files.catbox.moe/rmb9hb.mp3',
'https://files.catbox.moe/94f3ah.mp3',
'https://files.catbox.moe/r59jbk.mp3',
'https://files.catbox.moe/vazu0l.mp3',
'https://files.catbox.moe/ed46vg.mp3',
'https://files.catbox.moe/3arfe3.mp3',
'https://files.catbox.moe/6pzpfr.mp3',
'https://files.catbox.moe/dh3724.mp3',
'https://files.catbox.moe/u6yge7.mp3',
'https://files.catbox.moe/ciierd.mp3'
    ];

cmd({
    pattern: "list",
    react: "🛸",
    alias: ["✓", "list", "music"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu3',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    try {
        // Prepare menu text
        let madeMenu = `👨🏻‍💻 *${pushname}* 
        \nHELLOW HOW ARE YOU ?
          𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂`;

        // Send the list message
        await conn.sendMessage(from, { text: madeMenu });

        // Randomly select a voice link from the array
        const randomVoiceLink = voiceLinks[Math.floor(Math.random() * voiceLinks.length)];

        // Send the selected random voice as PTT (Push-To-Talk)
        await conn.sendMessage(from, { audio: { url: randomVoiceLink }, mimetype: 'audio/mp4', ptt: true });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

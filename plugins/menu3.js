const { cmd, commands } = require('../command');

// Voice links (hosted MP3 URLs)
const voiceLinks = [
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%201.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2010.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2011.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2012.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2013.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2014.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2015.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%2016.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%202.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%203.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%204.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%205.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%206.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%207.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%208.mp3',
'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/adobe%209.mp3'
];

cmd({
    pattern: "list",
    react: "🛸",
    alias: ["𝐘𝐨𝐮𝐫 𝐬𝐭𝐚𝐭𝐮𝐬 𝐯𝐞𝐰 𝐁𝐲 𝐐𝐮𝐞𝐞𝐧 𝐬𝐚𝐝𝐮", "list", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu3',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    try {
        // Prepare menu text
        let madeMenu = `👨🏻‍💻 *${pushname}* 
        \n𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐎𝐅𝐂`;

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

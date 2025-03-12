const { cmd, commands } = require('../command');

// Voice links (hosted MP3 URLs)
const voiceLinks = [
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3',  // Add voice link 1
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/gm.mp3',  // Add voice link 2
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/gn.mp3',  // Add voice link 3
    'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/bs.mp3'   // Add voice link 4
];

cmd({
    pattern: "list",
    react: "🛸",
    alias: ["panel", "list", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu3',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    try {
        // Prepare menu text
        let madeMenu = `👨🏻‍💻 *${pushname}* 
        \nQueen Sadu Bot Menu එකට පිළිගනිමු

        📜 *Commands List:*
        - .play: YouTube එකේ Audio Download කරන්න
        - .song: YouTube එකේ song එක Download කරන්න
        - .video: YouTube එකේ Video Download කරන්න
        - .sticker: Photo එක sticker එකක් ලෙස Convert කරන්න
        - .alive: Bot status එක බලන්න
        - .ping: Bot speed එක බලන්න
        - .menu: Main menu`;

        // Send the list message
        await conn.sendMessage(from, { text: madeMenu });

        // Randomly select a voice link from the array
        const randomVoiceLink = voiceLinks[Math.floor(Math.random() * voiceLinks.length)];

        // Send the selected random voice
        await conn.sendMessage(from, { audio: { url: randomVoiceLink }, mimetype: 'audio/mp4' });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

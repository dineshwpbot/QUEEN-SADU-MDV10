const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const ffmpeg = require('fluent-ffmpeg');  // You'll need to install 'fluent-ffmpeg' for conversion
const fetch = require('node-fetch'); // For fetching the API response

// song (for sending as voice message)
cmd({
    pattern: "song",
    alias: ["yta", "play"],
    react: "🎶",
    desc: "Download YouTube song as PTT voice message",
    category: "main",
    use: '.song < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 𝐘ʈ 𝐔ɼℓ ๏ɼ 𝐒๏ƞ͛g 𝐍αмє..*");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");

        let yts = yt.results[0];
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("Failed to fetch the audio. Please try again later.");
        }

        let ytmsg = `╔═══〔 *𓆩QUEEN-SADU𓆪* 〕═══❒
        ║╭───────────────◆
        ║│ *QUEEN-SADU-𝐌Ɗ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆*
        ║╰───────────────◆
        ╚══════════════════❒
        ╔══════════════════❒
        ║ ⿻ *ᴛɪᴛʟᴇ:*  ${yts.title}
        ║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${yts.timestamp}
        ║ ⿻ *ᴠɪᴇᴡs:*  ${yts.views}
        ║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${yts.author.name}
        ║ ⿻ *ʟɪɴᴋ:*  ${yts.url}
        ╚══════════════════❒
        *ᴩᴏᴡᴇʀᴇᴅ ʙʏ © ᴍʀ ᴅɪɴᴇꜱʜ*`;

        // Send song details
        await conn.sendMessage(from, { image: { url: data.result.image || '' }, caption: ytmsg }, { quoted: mek });

        // Convert to PTT voice message using ffmpeg
        let audioPath = 'audio.mp3';
        let pttAudioPath = 'voiceMessage.ogg';
        
        // Download the audio file
        const audioStream = await fetch(data.result.downloadUrl);
        const audioBuffer = await audioStream.buffer();
        
        // Save the audio file locally
        require('fs').writeFileSync(audioPath, audioBuffer);

        // Convert the MP3 to OGG (PTT format)
        ffmpeg(audioPath)
            .audioCodec('libopus')
            .toFormat('ogg')
            .save(pttAudioPath)
            .on('end', async () => {
                // Send PTT voice message
                await conn.sendMessage(from, { audio: { url: pttAudioPath }, mimetype: 'audio/ogg' }, { quoted: mek });
                
                // Optionally, send document (audio file)
                await conn.sendMessage(from, {
                    document: { url: pttAudioPath },
                    mimetype: "audio/ogg",
                    fileName: `${data.result.title}.ogg`,
                    caption: `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ🎐*`
                }, { quoted: mek });
            });
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

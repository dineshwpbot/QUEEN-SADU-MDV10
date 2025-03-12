module.exports = {
    name: 'rigintone',
    alias: ['rtone'], // වෙනත් alias එකක් එක් කරන්න පුළුවන්
    description: 'Send random voice message as PTT (voice note)',
    category: 'fun',
    lastSent: null, // එකම voice එකක් යාම වළක්වන්න
    async execute(client, message) {
        try {
            // Voice clips (Direct links)
            const voices = [
                'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3',
                'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/menu.mp3',
                'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/bs.mp3'
            ];

            if (voices.length === 0) {
                return await message.reply('🚫 No voice links found!');
            }

            // වරක් යැවූ voice එක යලි යෑම වැළැක්වීම
            let availableVoices = voices.filter(v => v !== this.lastSent);

            // සියලුම voice once යැව්වා නම් reset කරන්න
            if (availableVoices.length === 0) availableVoices = voices;

            // Random voice එකක් select කරන්න
            const randomVoice = availableVoices[Math.floor(Math.random() * availableVoices.length)];
            this.lastSent = randomVoice; // අවසන්ව යැවූ voice එක save කරන්න

            // Voice message (PTT format) send කරන්න
            await client.sendMessage(message.chat, {
                audio: { url: randomVoice },
                mimetype: 'audio/ogg; codecs=opus', // PTT format
                ptt: true // Voice note (push to talk) flag
            }, { quoted: message });

        } catch (error) {
            console.error('Error in rigintone command:', error);
            await message.reply('❌ Error occurred while sending the voice message.');
        }
    }
};

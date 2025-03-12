const axios = require('axios');

let chatbotEnabled = false; // Chatbot on/off state track කිරීම

module.exports = {
    name: 'chatbot',
    alias: ['cb'],
    description: 'Enable or disable Sinhala chatbot',
    category: 'fun',

    async execute(client, message, args) {
        try {
            // Command එක on/off ගැන තීරණය
            if (args[0] === 'on') {
                chatbotEnabled = true;
                await message.reply('🤖 Chatbot **ON**.');
            } else if (args[0] === 'off') {
                chatbotEnabled = false;
                await message.reply('🤖 Chatbot **OFF**.');
            } else {
                await message.reply('ℹ️ Use `.chatbot on` to enable and `.chatbot off` to disable.');
            }
        } catch (error) {
            console.error('Chatbot command error:', error);
            await message.reply('❌ Error occurred while executing the chatbot command.');
        }
    },

    async onMessage(client, message) {
        try {
            // Chatbot disable නම් message වලට ප්‍රතිචාර නැහැ
            if (!chatbotEnabled || message.isGroup || message.body.startsWith('.')) return;

            const userMessage = message.body.trim();
            console.log(`[CHATBOT] User: ${userMessage}`);

            // Sinhala chatbot API (simsimi alternative)
            const response = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(userMessage)}&lc=si`);
            const botReply = response.data.success || '🤖 මට තේරුනේ නෑ!';

            await client.sendMessage(message.chat, { text: botReply }, { quoted: message });

        } catch (error) {
            console.error('Chatbot reply error:', error);
            await message.reply('❌ Chatbot error occurred.');
        }
    }
};

const axios = require('axios');

let chatbotEnabled = false; // Chatbot on/off state track කිරීම සඳහා

module.exports = {
    name: 'chatbot',
    alias: ['cb'],
    description: 'Enable or disable Sinhala chatbot',
    category: 'fun',
    async execute(client, message, args) {
        try {
            // Chatbot on/off කරන logic
            if (args[0] === 'on') {
                chatbotEnabled = true;
                return await message.reply('🤖 Chatbot **ON**.');
            } else if (args[0] === 'off') {
                chatbotEnabled = false;
                return await message.reply('🤖 Chatbot **OFF**.');
            } else {
                return await message.reply('ℹ️ Use `.chatbot on` to enable and `.chatbot off` to disable.');
            }
        } catch (error) {
            console.error('Chatbot command error:', error);
            await message.reply('❌ Error occurred while executing the chatbot command.');
        }
    },
    
    async onMessage(client, message) {
        try {
            // Chatbot disabled නම් reply නොකරන්න
            if (!chatbotEnabled || message.isGroup) return;

            // Chatbot API call (Sinhala reply)
            const userMessage = message.body.trim();
            const response = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(userMessage)}&lc=si`);

            if (response.data && response.data.success) {
                const botReply = response.data.success;
                await client.sendMessage(message.chat, { text: botReply }, { quoted: message });
            } else {
                await message.reply('🤖 I am here but couldn\'t understand. Try again!');
            }

        } catch (error) {
            console.error('Chatbot error:', error);
            await message.reply('❌ Chatbot error occurred.');
        }
    }
};

const { command } = require("../lib");
const puppeteer = require("puppeteer");
const moment = require("moment");

const aviatorConfig = {
    "1xbetID": "1164887731",  // 1xBet ID එක මෙහි ඇතුලත් කරන්න.
    "signalsPerHour": 20,
    "status": true // Default status එක off
};

async function scrapeAviatorData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(`https://1xbet.com/aviator?user=${aviatorConfig.1xbetID}`, {
            waitUntil: 'load',
            timeout: 60000
        });
        await page.waitForSelector('.crash-point');

        const data = await page.evaluate(() => {
            const points = Array.from(document.querySelectorAll('.crash-point'))
                .map(el => parseFloat(el.textContent));
            return points.slice(0, 5);  // Last 5 crashes
        });

        await browser.close();
        return data;

    } catch (error) {
        console.error("Scraping Error: ", error);
        await browser.close();
        return [];
    }
}

async function generateSignal() {
    const data = await scrapeAviatorData();
    if (data.length === 0) return "❌ Data Collection Failed";

    const lastCrash = data[0];
    const prediction = lastCrash < 2.0 ? "🟢 High Win Chance" : "🔴 Low Win Chance";

    return `🚀 *Aviator Signal* 🚀\n📊 Last Crash: ${lastCrash}\n📅 Time: ${moment().format('HH:mm:ss')}\n💡 Prediction: ${prediction}`;
}

async function autoSendSignal(message) {
    if (!aviatorConfig.status) return;  // Check if auto signal is enabled

    const signal = await generateSignal();
    if (signal) {
        await message.send(signal);
    }
}

setInterval(() => {
    if (aviatorConfig.status) autoSendSignal(global.message);  // Send signal at regular intervals
}, (3600 / aviatorConfig.signalsPerHour) * 1000);  // Adjusted interval for sending signals every hour

// Command to enable or disable the Aviator signal plugin
command(
    {
        pattern: "aviator",  // Trigger command
        fromMe: true,        // Command is for the bot owner only
        desc: "Enable/Disable 1xBet Aviator Signal"  // Command description
    },
    async (message, match) => {
        if (match === "on") {
            aviatorConfig.status = true;  // Enable signals
            await message.send("✅ *Aviator Signal Enabled*");
        } else if (match === "off") {
            aviatorConfig.status = false;  // Disable signals
            await message.send("❌ *Aviator Signal Disabled*");
        } else {
            const signal = await generateSignal();  // Generate one-off signal
            await message.send(signal);
        }
    }
);

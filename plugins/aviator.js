const { command } = require("../lib");
const puppeteer = require("puppeteer");
const moment = require("moment");

const aviatorConfig = {
    "1xbetID": "1164887731",
    "signalsPerHour": 20,
    "status": false
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
            return points.slice(0, 5);
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
    if (!aviatorConfig.status) return;

    const signal = await generateSignal();
    if (signal) {
        await message.send(signal);
    }
}

setInterval(() => {
    if (aviatorConfig.status) autoSendSignal(global.message);
}, (3600 / aviatorConfig.signalsPerHour) * 1000);

command(
    {
        pattern: "aviator",
        fromMe: true,
        desc: "Enable/Disable 1xBet Aviator Signal"
    },
    async (message, match) => {
        if (match === "on") {
            aviatorConfig.status = true;
            await message.send("✅ *Aviator Signal Enabled*");
        } else if (match === "off") {
            aviatorConfig.status = false;
            await message.send("❌ *Aviator Signal Disabled*");
        } else {
            const signal = await generateSignal();
            await message.send(signal);
        }
    }
);

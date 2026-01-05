import { Client, LocalAuth } from "whatsapp-web.js";
import qr from "qrcode-terminal";

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "./whatsapp-session", // Path where the session data will be stored
  }),
  puppeteer: {
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qrcode) => {
  qr.generate(qrcode, { small: true });
});

// Start your client
client.initialize();

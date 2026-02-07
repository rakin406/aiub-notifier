import "dotenv/config";
import nodemailer from "nodemailer";

import { logger } from "./logger";
import { getLatestNotice } from "./notice-scraper";

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function notify() {
  // Get notice
  const notice = await getLatestNotice();
  if (!notice) return;

  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"AIUB Notifier" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      // TODO: Replace subject with notice title.
      subject: "Hello ✔",
      html: notice,
    });

    logger.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    logger.error(error);
  }
}

// Graceful shutdown
process.on("SIGTERM", () => {
  transporter.close();
  logger.info("Transporter closed");
  process.exit(0);
});

notify();

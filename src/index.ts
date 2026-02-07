import "dotenv/config";
import nodemailer from "nodemailer";
import cron from "node-cron";

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
      subject: notice.title,
      html: notice.content,
    });

    logger.info(`Message sent: ${info.messageId}`);
  } catch (error) {
    logger.error(error);
  }
}

function shutdown() {
  transporter.close();
  logger.info("Transporter closed");
  process.exit(0);
}

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Run task every 10 minutes
cron.schedule("* * * * *", notify);

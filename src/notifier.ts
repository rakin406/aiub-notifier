import "dotenv/config";
import nodemailer from "nodemailer";

import { logger } from "./logger";
import { Notice } from "./notice-scraper";

export async function notify(notice: Notice) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

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

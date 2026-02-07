import { Resend } from "resend";

import { logger } from "./logger";
import { Notice } from "./notice-scraper";

export async function notify(notice: Notice, env) {
  const resend = new Resend(env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "AIUB Notifier <onboarding@resend.dev>",
    to: env.EMAIL,
    subject: notice.title,
    html: notice.content,
  });

  if (error) {
    return logger.error({ error });
  }

  logger.info("Message sent to", env.EMAIL);
}

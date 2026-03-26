import { Resend } from "resend";

import Notice from "./notice";
import logger from "./logger";

export async function notify(notice: Notice) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "AIUB Notifier <onboarding@resend.dev>",
    to: process.env.EMAIL!,
    subject: notice.title,
    html: `<a href="${notice.url}">${notice.url}</a>`,
  });

  if (error) {
    return logger.error({ error });
  }

  logger.info(`Message sent to ${process.env.EMAIL}`);
}

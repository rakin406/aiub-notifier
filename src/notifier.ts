import { Resend } from "resend";
import { Notice } from "./notice-scraper";

export async function notify(notice: Notice, env) {
  const resend = new Resend(env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "AIUB Notifier <onboarding@resend.dev>",
    to: env.EMAIL,
    subject: notice.title,
    html: `<a>${notice.url}</a>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log("Message sent to", env.EMAIL);
}

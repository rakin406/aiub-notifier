import * as cheerio from "cheerio";

import { AIUB_NOTICES_URL } from "./constants";

let prevHref = "";

export type Notice = {
  title: string;
  content: string;
};

export async function getLatestNotice() {
  try {
    const res = await fetch(AIUB_NOTICES_URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const lastNoticeHref = $("a.info-link").attr("href");

    if (!lastNoticeHref || lastNoticeHref === prevHref) {
      return null;
    }

    // Get latest notice title
    const title = $("h2.title").first().text().trim();

    // Get latest notice page
    const noticeUrl = "https://www.aiub.edu" + lastNoticeHref;
    const noticeRes = await fetch(AIUB_NOTICES_URL);
    const noticeHtml = await noticeRes.text();
    const $noticePage = cheerio.load(noticeHtml);
    console.log("Fetched", noticeUrl);

    // Get notice content
    const content =
      $noticePage("div[class=question-column]").html() ??
      "<p>Failed to fetch description.</p>";

    prevHref = lastNoticeHref;

    const notice: Notice = {
      title: title,
      content: content,
    };

    return notice;
  } catch (error) {
    console.error(error);
    return null;
  }
}

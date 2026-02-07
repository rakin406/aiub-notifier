import * as cheerio from "cheerio";

import { AIUB_NOTICES_URL } from "./constants";

let prevHref = "";

export type Notice = {
  title: string;
  url: string;
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

    prevHref = lastNoticeHref;

    const notice: Notice = {
      title: title,
      url: noticeUrl,
    };

    return notice;
  } catch (error) {
    console.error(error);
    return null;
  }
}

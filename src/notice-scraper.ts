import * as cheerio from "cheerio";

import { logger } from "./logger";
import { AIUB_NOTICES_URL } from "./constants";

let prevHref = "";

export type Notice = {
  title: string;
  content: string;
};

export async function getLatestNotice() {
  try {
    const $ = await cheerio.fromURL(AIUB_NOTICES_URL);

    const lastNoticeHref = $("a.info-link").attr("href");

    if (!lastNoticeHref || lastNoticeHref === prevHref) {
      return null;
    }

    // Get latest notice title
    const title = $("h2.title").first().text().trim();

    // Get latest notice page
    const noticeUrl = "https://www.aiub.edu" + lastNoticeHref;
    const $noticePage = await cheerio.fromURL(noticeUrl);
    logger.info(`Fetched ${noticeUrl}`);

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
    logger.error(error);
    return null;
  }
}

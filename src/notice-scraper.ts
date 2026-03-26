import * as cheerio from "cheerio";

import Notice from "./notice";
import logger from "./logger";
import { AIUB_ENDPOINT, AIUB_NOTICES_URL } from "./constants";

export async function getLatestNotice() {
  try {
    const res = await fetch(AIUB_NOTICES_URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const lastNoticeHref = $("a.info-link").attr("href");

    if (!lastNoticeHref) {
      logger.error("Could not find the latest notice");
      return null;
    }

    // Get latest notice title
    const title = $("h2.title").first().text().trim();

    // Get latest notice page
    const noticeUrl = AIUB_ENDPOINT + lastNoticeHref;

    const notice: Notice = {
      title: title,
      url: noticeUrl,
    };

    return notice;
  } catch (error) {
    logger.error({ error });
    return null;
  }
}

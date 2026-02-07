import * as cheerio from "cheerio";

import { logger } from "./logger";
import { AIUB_NOTICES_URL } from "./constants";

let prevHref = "";

export async function getLatestNotice() {
  try {
    const $ = await cheerio.fromURL(AIUB_NOTICES_URL);

    const lastNoticeHref = $("a.info-link").attr("href");

    if (!lastNoticeHref || lastNoticeHref === prevHref) {
      return null;
    }

    // Get latest notice page
    const noticeUrl = "https://www.aiub.edu" + lastNoticeHref;
    const $notice = await cheerio.fromURL(noticeUrl);
    logger.info(`Fetched ${noticeUrl}`);

    return $notice.html();
  } catch (error) {
    logger.error(error);
    return null;
  }
}

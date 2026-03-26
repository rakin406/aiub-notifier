import fs from "fs";

import logger from "./logger";
import { getLatestNotice } from "./notice-scraper";
import { notify } from "./notifier";
import { DATA_DIR, PREV_LINK_FILE } from "./constants";

(async () => {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });

    // Get notice
    const notice = await getLatestNotice();
    let prevNoticeUrl: string | null = null;

    // Get previous notice URL if it exists
    fs.readFile(PREV_LINK_FILE, (err, data) => {
      if (!err) {
        prevNoticeUrl = data.toString();
      }
    });

    // Send new notice
    if (notice && notice.url !== prevNoticeUrl) {
      await notify(notice);

      // Save notice
      fs.writeFile(PREV_LINK_FILE, notice.url, (err) => {
        if (err) {
          logger.error({ err });
          process.exitCode = 2;
          return;
        }
        logger.info(`Notice URL saved to ${PREV_LINK_FILE}`);
      });
    }
  } catch (error) {
    logger.error({ error });
    process.exitCode = 1;
  }
})();

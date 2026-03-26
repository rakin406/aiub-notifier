import fs from "fs";

import logger from "./logger";
import { getLatestNotice } from "./notice-scraper";
import { notify } from "./notifier";
import { DATA_DIR, PREV_LINK_FILE } from "./constants";

(async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Get notice
    const notice = await getLatestNotice();
    let prevNotice = null;

    // Get previous notice URL if it exists
    fs.readFile(PREV_LINK_FILE, (err, data) => {
      if (!err && data) {
        prevNotice = data;
      }
    });

    // Send new notice
    if (notice && notice !== prevNotice) {
      await notify(notice);
    }
  } catch (error) {
    logger.error({ error });
    process.exitCode = 1;
  }
})();

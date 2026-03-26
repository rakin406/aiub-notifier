import fs from "fs";

import logger from "./logger";
import { getLatestNotice } from "./notice-scraper";
import { notify } from "./notifier";
import { DATA_DIR } from "./constants";

(async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Get notice
    const notice = await getLatestNotice();

    // Send notice
    if (notice) {
      await notify(notice);
    }
  } catch (error) {
    logger.error({ error });
    process.exitCode = 1;
  }
})();

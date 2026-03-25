import "dotenv/config";

import { getLatestNotice } from "./notice-scraper";
import { notify } from "./notifier";

(async () => {
  // Get notice
  const notice = await getLatestNotice();
  if (!notice) return;

  await notify(notice);
})();

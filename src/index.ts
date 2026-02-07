import { getLatestNotice } from "./notice-scraper";
import { notify } from "./notifier";

interface Env {}
export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ) {
    // Get notice
    const notice = await getLatestNotice();
    if (!notice) return;

    await notify(notice);
  },
};

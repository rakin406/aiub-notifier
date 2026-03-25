import os from "os";
import path from "path";

const DATA_DIR = path.join(os.homedir(), ".local", "share", "aiub-notifier");
const LOG_FILE = path.join(DATA_DIR, "logs", `pino-${process.pid}-log`);
const PREV_LINK_FILE = path.join(DATA_DIR, "prev-link.txt");
const AIUB_ENDPOINT = "https://www.aiub.edu";
const AIUB_NOTICES_URL = AIUB_ENDPOINT + "/category/notices";

export { DATA_DIR, LOG_FILE, PREV_LINK_FILE, AIUB_ENDPOINT, AIUB_NOTICES_URL };

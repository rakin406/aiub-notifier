import os from "os";
import path from "path";

const CONFIG_DIR = path.join(os.homedir(), ".config", "aiub-notifier");
const PREV_LINK_FILE = path.join(CONFIG_DIR, "prev-link.txt");
const AIUB_ENDPOINT = "https://www.aiub.edu";
const AIUB_NOTICES_URL = AIUB_ENDPOINT + "/category/notices";

export { AIUB_ENDPOINT, AIUB_NOTICES_URL, PREV_LINK_FILE };

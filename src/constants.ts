import os from "os";
import path from "path";

function getDataDir(dir_name: string): string {
  const homeDir = os.homedir();

  switch (os.platform()) {
    case "win32":
      // Windows: Use LOCALAPPDATA if available, fallback to home directory.
      return path.join(process.env.LOCALAPPDATA || homeDir, dir_name);
    case "darwin":
      // macOS: ~/Library/Application Support/
      return path.join(homeDir, "Library", "Application Support", dir_name);
    default:
      // Linux and others: ~/.local/share/
      return path.join(homeDir, ".local", "share", dir_name);
  }
}

const DATA_DIR = getDataDir("aiub-notifier");
const LOG_FILE = path.join(DATA_DIR, "logs", `pino-${process.pid}-log`);
const PREV_LINK_FILE = path.join(DATA_DIR, "prev-link.txt");
const AIUB_ENDPOINT = "https://www.aiub.edu";
const AIUB_NOTICES_URL = AIUB_ENDPOINT + "/category/notices";

export { DATA_DIR, LOG_FILE, PREV_LINK_FILE, AIUB_ENDPOINT, AIUB_NOTICES_URL };

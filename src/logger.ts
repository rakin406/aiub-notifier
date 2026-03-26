import pino from "pino";

import { LOG_FILE } from "./constants";

const logger = pino({
  transport: {
    target: "pino/file",
    options: {
      destination: LOG_FILE,
      mkdir: true,
    },
  },
});

export default logger;

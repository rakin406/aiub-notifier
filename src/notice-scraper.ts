import * as cheerio from "cheerio";

import { logger } from "./logger";
import { AIUB_NOTICES_URL } from "./constants";

// async function getPage(url: string): Promise<string | null> {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     logger.error(error);
//     return null;
//   }
// }

export async function getLatestNotice() {
  try {
    const $ = await cheerio.fromURL(AIUB_NOTICES_URL);
    const $selected = $(".date-custom.pixel-pattern.high");
    console.log($selected.text());
  } catch (error) {
    logger.error(error);
  }
}

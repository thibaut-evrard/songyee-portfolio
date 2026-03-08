import { google, sheets_v4 } from "googleapis";
import { CONTENT_SHEET_ID } from "../constants";
import { getTabContent } from "../utils/tab-content";
import { mkdir, writeFile } from "fs/promises";
import { getTabNames } from "scripts/utils/tabs";
import { getAuthClient } from "scripts/utils/auth";

export const Logs = [];

const OUTPUT_FOLDER_PATH = "frontend/src/generated";
const OUTPUT_FILE_NAME = "content.json";

function targetTabs(names: string[], prefix: string) {
  return names.filter((name) => name.includes(prefix));
}

async function saveDataToJson(content: Record<string, object>) {
  try {
    await mkdir(OUTPUT_FOLDER_PATH, { recursive: true });
    await writeFile(
      `${OUTPUT_FOLDER_PATH}/${OUTPUT_FILE_NAME}`,
      JSON.stringify(content, null),
    );
    console.log(`Content successfully written`);
  } catch (error) {
    console.error(`Error writing types to file: ${error}`);
    throw error;
  }
}

async function getSiteContent() {
  console.log("Get site content");

  const client = await getAuthClient();
  const sheets: sheets_v4.Sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const tabNames = await getTabNames(sheets, CONTENT_SHEET_ID);

  const general = await getTabContent(sheets, CONTENT_SHEET_ID, "general");
  const home = await getTabContent(sheets, CONTENT_SHEET_ID, "home");

  const case_studies = [];
  for (const tab of targetTabs(tabNames, "case-study")) {
    case_studies.push(await getTabContent(sheets, CONTENT_SHEET_ID, tab));
  }

  const q_and_a = [];
  for (const tab of targetTabs(tabNames, "q-and-a")) {
    q_and_a.push(await getTabContent(sheets, CONTENT_SHEET_ID, tab));
  }

  const big_ideas = [];
  for (const tab of targetTabs(tabNames, "big-ideas")) {
    big_ideas.push(await getTabContent(sheets, CONTENT_SHEET_ID, tab));
  }

  const json = {
    general,
    home,
    case_studies,
    q_and_a,
    big_ideas,
  };

  console.log(Logs);
  await saveDataToJson(json);
}

getSiteContent();

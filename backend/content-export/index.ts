import { google, sheets_v4 } from "googleapis";
import { CONTENT_SHEET_ID } from "../constants";
import { getTabContent } from "../utils/tab-content";
import { mkdir, writeFile } from "fs/promises";
import { getTabNames } from "../utils/tabs";
import { getAuthClient } from "../utils/auth";
import "dotenv/config";
import { Logs } from "../utils/logs";

const OUTPUT_FOLDER_PATH = "../frontend/src/content";
const OUTPUT_FILE_NAME = "content.json";

export const SHEET_TABS = ["home", "about", "project-[uid]"];

function targetTabs(names: string[], prefix: string) {
  return names.filter((name) => name.includes(prefix));
}

async function saveDataToJson(content: any) {
  try {
    await mkdir(OUTPUT_FOLDER_PATH, { recursive: true });
    await writeFile(`${OUTPUT_FOLDER_PATH}/${OUTPUT_FILE_NAME}`, JSON.stringify(content, null));
    console.log(`Content successfully written`);
  } catch (error) {
    console.error(`Error writing types to file: ${error}`);
    throw error;
  }
}

async function getSiteContent() {
  console.log("Get site content", process.env.CONTENT_SHEET_ID);

  const client = await getAuthClient();
  const sheets: sheets_v4.Sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const tabNames = await getTabNames(sheets, CONTENT_SHEET_ID);
  console.log(`Tab names: ${tabNames}`);

  const home = await getTabContent(sheets, CONTENT_SHEET_ID, "home");
  const about = await getTabContent(sheets, CONTENT_SHEET_ID, "about");
  const general = await getTabContent(sheets, CONTENT_SHEET_ID, "general");

  let projects = [];
  for (const projectName of targetTabs(tabNames, "project-")) {
    const projectContent = await getTabContent(sheets, CONTENT_SHEET_ID, projectName);
    projects.push(projectContent);
  }

  const json = {
    general,
    home,
    about,
    projects,
  };

  console.log(Logs);
  await saveDataToJson(json);
}

getSiteContent();

import type { sheets_v4 } from "googleapis";
import { console } from "inspector";
import { Logs } from './logs';
import Content from './content';

async function getTabData(api: sheets_v4.Sheets, id: string, tabName: string) {
  const { data } = await api.spreadsheets.values.get({
    spreadsheetId: id,
    range: tabName,
  });

  if (!data.values) {
    throw new Error("No values found.");
  }

  return data.values as string[][];
}

function removeTabHead(content: string[][]) {
  const newContent = [...content];
  newContent.splice(0, 1);
  const filteredContent = newContent.filter((item) => item.length > 0);
  return filteredContent;
}

export async function getTabContent(
  api: sheets_v4.Sheets,
  id: string,
  tabName: string,
) {
  console.log(`Getting content for tab ${tabName}`);
  const content = new Content();

  try {
    const rawData = await getTabData(api, id, tabName);
    const data = removeTabHead(rawData);
    content.addRows(data);

    return content;
  } catch (error) {
    Logs.push(`ERROR - Failed to get content for tab ${tabName}: ${error}`);
  }
}

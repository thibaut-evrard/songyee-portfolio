import type { sheets_v4 } from "googleapis";
import { console } from "inspector";
import { Logs } from "scripts/content";

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

function trimTabContent(content: string[][]) {
  const newContent = [...content];
  newContent.splice(0, 1);
  const filteredContent = newContent.filter((item) => item.length > 0);
  return filteredContent;
}

function getKeyValue(key: string, value: string) {
  const sanitisedKey = key.replace("(json)", "");
  const isJson = key.includes("(json)");

  let outValue = "";
  if (isJson) {
    outValue = JSON.parse(value);
  } else if (value) {
    outValue = value.replace(/\r?\n/g, "\n");
  }

  return {
    key: sanitisedKey,
    value: outValue,
  };
}

function addEntryToContent(content: object, rawKey: string, value: string) {
  const keyChain = rawKey.split("--");
  let targetProp = content;

  for (const [keyIndex, keyName] of Array.from(keyChain.entries())) {
    const isLastKey = keyIndex === keyChain.length - 1;

    if (isLastKey) {
      const out = getKeyValue(keyName, value);
      targetProp[out.key] = out.value;
    } else {
      targetProp[keyName] = targetProp[keyName] || {};
      targetProp = targetProp[keyName];
    }
  }
}

function addEntryArrayToContent(
  content: object,
  rawKey: string,
  values: string[],
) {
  const emptyArray = values.map(() => ({}));
  const keyChain = rawKey.split("--");
  let currentObj = content;

  for (const [keyIndex, keyName] of Array.from(keyChain.entries())) {
    const isLastKey = keyIndex === keyChain.length - 1;
    const isArrayLevel = keyName.includes("(list)");

    if (isArrayLevel) {
      const sanitisedKeyName = keyName.replace("(list)", "");
      currentObj[sanitisedKeyName] = currentObj[sanitisedKeyName] || emptyArray;
      currentObj = currentObj[sanitisedKeyName];

      for (const [index, value] of Array.from(values.entries())) {
        const arrayItem = currentObj[index];
        const arrayKeyChain = [...keyChain].splice(keyIndex + 1).join("--");
        addEntryToContent(arrayItem, arrayKeyChain, value);
      }

      return;
    } else if (isLastKey) {
      Logs.push(`ERROR - Invalid list at [${rawKey}]`);
    }

    currentObj[keyName] = currentObj[keyName] || {};
    currentObj = currentObj[keyName];
  }
}

export async function getTabContent(
  api: sheets_v4.Sheets,
  id: string,
  tabName: string,
) {
  const content = {};

  try {
    const rawData = await getTabData(api, id, tabName);
    const data = trimTabContent(rawData);
    const dataEntries = Array.from(data.entries());

    for (const [rowIndex, row] of dataEntries) {
      const key = row[0];
      const values = row.slice(1);

      if (values.length === 0) {
        Logs.push(`WARNING - Missing content at [${tabName}][${key}]`);
      }

      if (values.length <= 1) {
        addEntryToContent(content, key, values[0]);
      } else {
        addEntryArrayToContent(content, key, values);
      }
    }

    return content;
  } catch (error) {
    console.error(error);
  }
}

import { Logs } from "./logs";

const SEPARATORS = {
  nesting: ".",
};

const REGEX: Record<string, RegExp> = {
  list: /\[\d*\]/,
  listIndex: /(?<=\[)\d*(?=\])/g,
};

function isList(chunk: string) {
  return REGEX.list.test(chunk);
}

function getListIndex(chunk: string) {
  const matches = chunk.match(REGEX.listIndex);
  if (matches && matches.length > 0 && matches[0] !== "") {
    return matches[0];
  } else {
    return undefined;
  }
}

function purifyChunk(chunk: string) {
  return chunk.replace(REGEX.list, "");
}

class Content extends Object {
  currentKey = "";

  addRows(rows: string[][]) {
    for (const row of rows) {
      this.addRow(row);
    }
  }

  private addRow(row: string[]) {
    const key = row[0];
    const values = row.splice(1);
    const keyChunks = key.split(SEPARATORS.nesting);

    this.currentKey = key;
    this.processChunk(keyChunks, values, this);
  }

  private processChunk(keyChunks: string[], values: string[], target: any) {
    const rawCurrentChunk = keyChunks[0];
    const currentChunk = purifyChunk(rawCurrentChunk);
    const nextChunks = keyChunks.splice(1);

    if (nextChunks.length === 0) {
      if (values.length > 1) {
        target[currentChunk] = values;
      } else if (values.length === 1) {
        target[currentChunk] = values[0];
      } else {
        target[currentChunk] = "";
        Logs.push(`Warning - Missing value at key [${this.currentKey}]`);
      }
      return;
    }

    if (isList(rawCurrentChunk)) {
      const listIndex = getListIndex(rawCurrentChunk);
      target[currentChunk] = target[currentChunk] || [];

      if (listIndex === undefined) {
        for (const [index, value] of values.entries()) {
          target[currentChunk][index] = target[currentChunk][index] || {};
          this.processChunk(nextChunks, [value], target[currentChunk][index]);
        }
      } else {
        target[currentChunk][listIndex] = target[currentChunk][listIndex] || {};
        this.processChunk(nextChunks, values, target[currentChunk][listIndex]);
      }
    } else {
      target[currentChunk] = target[currentChunk] || {};
      this.processChunk(nextChunks, values, target[currentChunk]);
    }
  }
}

export default Content;

import type {sheets_v4} from 'googleapis';

export async function getTabNames(api: sheets_v4.Sheets, id: string) {
  const {data} = await api.spreadsheets.get({
    spreadsheetId: id,
    fields: 'sheets.properties',
  });
  const result = data.sheets?.map(({properties}) => {
    const title = properties?.title;
    if (!title) throw new Error('Missing tab title.');
    return title;
  });
  if (!result) throw new Error('No tabs found.');
  return result;
}

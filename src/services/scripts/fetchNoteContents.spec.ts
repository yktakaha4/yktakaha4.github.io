import * as constants from '@/constants';
import * as note from '@/services/sns/note';
import { tempDir } from '@/test/helper';
import { fetchNoteContents } from '@/services/scripts/fetchNoteContents';
import { readJsonSync } from 'fs-extra';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

const mockedFetchContents = jest.fn();
jest
  .spyOn(note, 'fetchContents')
  .mockImplementation((...args) => mockedFetchContents(...args));

describe('fetchNoteContents', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    const expectedContents = [
      {
        name: 'dummy content 1',
      },
      {
        name: 'dummy content 2',
      },
    ];
    mockedFetchContents.mockImplementation(() => expectedContents);

    await fetchNoteContents();

    const contents = readJsonSync(`${dir}/noteContents.json`);
    expect(contents).toEqual({
      contents: expectedContents,
    });
  });
});

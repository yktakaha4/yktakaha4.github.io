import nock from 'nock';
import noteApiGetContentsResponse from '@/services/sns/mocks/noteApiGetContentsResponse.json';
import * as constants from '@/constants';
import { fetchContents, storeContents } from '@/services/sns/note';
import { tempDir } from '@/jest/helper';
import { existsSync, readJsonSync } from 'fs-extra';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

describe('fetchContents', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('記事が取得できる', async () => {
    nock('https://note.com')
      .get('/api/v2/creators/yktakaha4/contents')
      .query({
        kind: 'note',
        page: '1',
      })
      .reply(200, noteApiGetContentsResponse);

    const contents = await fetchContents('yktakaha4');

    expect(contents.length).toBe(2);
    expect(contents[0].name).toBe(
      '新しいチームに加わるエンジニアのための "被" オンボーディングガイド v0.1.1',
    );
  });
});

describe('storeContents', () => {
  test('記事が保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const contents = [
      {
        dummy: 'dummy',
      },
    ];
    await storeContents(contents);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      contents,
    });
  });
});

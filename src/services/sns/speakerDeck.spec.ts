import nock from 'nock';
import { fetchSlides, storeSlides } from '@/services/sns/speakerDeck';
import * as constants from '@/constants';
import { tempDir } from '@/test/helper';
import { existsSync, readFileSync, readJsonSync } from 'fs-extra';
import { vi } from 'vitest';
import { join } from 'path';

const mockedGetSNSDataPath = vi.fn();
vi.spyOn(constants, 'getSNSDataPath').mockImplementation((...args) =>
  mockedGetSNSDataPath(...args),
);

describe('fetchSlides', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('スライドが取得できる', async () => {
    const rssResponse = readFileSync(
      join(__dirname, 'mocks', 'speakerDeckRssResponse.xml'),
      'utf-8',
    );

    nock('https://speakerdeck.com')
      .get('/yktakaha4.rss')
      .reply(200, rssResponse);

    const slides = await fetchSlides('yktakaha4');

    expect(slides.length).toBe(3);
    expect(slides[0].title).toBe('私のZennの書き方 / How I Write on Zenn');
    expect(slides[0].link).toBe(
      'https://speakerdeck.com/yktakaha4/how-i-write-on-zenn',
    );
    expect(slides[0].description).toContain('Zenncafe#5日比谷');
    expect(slides[0].pubDate.toISOString()).toBe(
      new Date('2025-12-12T05:00:00.000Z').toISOString(),
    );
  });
});

describe('storeSlides', () => {
  test('スライドが保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const slides = [
      {
        dummy: 'dummy',
      },
    ];
    await storeSlides('yktakaha4', slides);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual(slides);
  });
});

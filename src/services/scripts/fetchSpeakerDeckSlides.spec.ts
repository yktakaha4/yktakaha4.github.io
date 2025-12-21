import { fetchSpeakerDeckSlides } from '@/services/scripts/fetchSpeakerDeckSlides';
import * as constants from '@/constants';
import * as speakerDeck from '@/services/sns/speakerDeck';
import { tempDir } from '@/test/helper';
import { readJsonSync } from 'fs-extra';
import { vi } from 'vitest';

const mockedGetSNSDataPath = vi.fn();
vi.spyOn(constants, 'getSNSDataPath').mockImplementation((...args) =>
  mockedGetSNSDataPath(...args),
);

const mockedFetchSlides = vi.fn();
vi.spyOn(speakerDeck, 'fetchSlides').mockImplementation((...args) =>
  mockedFetchSlides(...args),
);

describe('fetchSpeakerDeckSlides', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    const expectedSlides = [
      {
        title: 'dummy slide 1',
      },
      {
        title: 'dummy slide 2',
      },
    ];
    mockedFetchSlides.mockImplementation(() => expectedSlides);

    await fetchSpeakerDeckSlides();

    const slides = readJsonSync(`${dir}/speakerDeckSlides.json`);
    expect(slides).toEqual({
      slides: expectedSlides,
    });
  });
});

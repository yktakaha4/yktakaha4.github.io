import { buildComponentsData } from '@/services/scripts/buildComponentsData';
import * as constants from '@/constants';
import { tempDir } from '@/test/helper';
import { readJsonSync } from 'fs-extra';
import { vi } from 'vitest';

const mockedGetComponentsDataPath = vi.fn();
vi
  .spyOn(constants, 'getComponentsDataPath')
  .mockImplementation((...args) => mockedGetComponentsDataPath(...args));

describe('buildComponentsData', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetComponentsDataPath.mockImplementation(
      (name) => `${dir}/${name}.json`,
    );

    await buildComponentsData();

    const techArticles = readJsonSync(`${dir}/techArticles.json`);
    expect(techArticles.articles.length).toBeGreaterThan(0);
    expect(techArticles.articles[0].title).toBeDefined();
    expect(techArticles.articles[0].url).toBeDefined();

    const ossContributions = readJsonSync(`${dir}/ossContributions.json`);
    expect(ossContributions.contributions.length).toBeGreaterThan(0);
    expect(ossContributions.contributions[0].title).toBeDefined();
    expect(ossContributions.contributions[0].url).toBeDefined();
  });
});

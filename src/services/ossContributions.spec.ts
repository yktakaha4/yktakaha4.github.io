import {
  getOSSContributions,
  OSSContribution,
  sortOSSContributions,
  storeOSSContributions,
} from '@/services/ossContributions';
import { tempDir } from '@/test/helper';
import { existsSync, readJsonSync } from 'fs-extra';
import * as constants from '@/constants';
import { vi } from 'vitest';

const mockedGetComponentsDataPath = vi.fn();
vi.spyOn(constants, 'getComponentsDataPath').mockImplementation((...args) =>
  mockedGetComponentsDataPath(...args),
);

describe('getOSSContributions', () => {
  test('OSS活動が取得できる', () => {
    const contributions = getOSSContributions();
    expect(contributions.length).toBeGreaterThanOrEqual(30);
    expect(contributions.filter((c) => c.repository.stars < 10).length).toBe(0);
    expect(
      contributions.filter((c) => c.repository.owner === 'yktakaha4').length,
    ).toBe(0);
  });
});

describe('sortOSSContributions', () => {
  test('OSS活動がソートできる', () => {
    const defaultValues: OSSContribution = {
      title: 'dummy',
      mergedAt: new Date(),
      url: 'https://dummy.com',
      kind: 'mergedPullRequest',
      changedLines: 0,
      repository: {
        owner: 'dummy',
        name: 'dummy',
        stars: 1,
        url: 'https://dummy.com',
        languages: ['dummy'],
      },
    };

    const contributions = [
      {
        ...defaultValues,
        title: 'dummy1',
        changedLines: 10,
        mergedAt: new Date('2021-01-01'),
      },
      {
        ...defaultValues,
        title: 'dummy2',
        changedLines: 20,
        mergedAt: new Date('2021-01-02'),
      },
      {
        ...defaultValues,
        title: 'dummy3',
        changedLines: 30,
        mergedAt: new Date('2021-01-02'),
      },
    ];

    const sorted = sortOSSContributions(contributions);
    expect(sorted.length).toBe(3);
    expect(sorted[0].title).toBe('dummy3');
    expect(sorted[1].title).toBe('dummy2');
    expect(sorted[2].title).toBe('dummy1');

    expect(sorted).not.toEqual(contributions);
  });
});

describe('storeOSSContributions', () => {
  test('OSS活動が保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetComponentsDataPath.mockImplementation(() => mockedJsonPath);

    const contributions = [
      {
        dummy: 'dummy',
      },
    ];
    await storeOSSContributions(contributions);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      contributions,
    });
  });
});

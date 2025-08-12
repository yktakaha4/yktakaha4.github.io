import * as constants from '@/constants';
import { tempDir } from '@/test/helper';
import { fetchGitHubPullRequests } from '@/services/scripts/fetchGitHubPullRequests';
import * as github from '@/services/sns/gitHub';
import { readJsonSync } from 'fs-extra';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

const mockedCheckGitHubPAT = jest.fn();
jest
  .spyOn(github, 'checkGitHubPAT')
  .mockImplementation((...args) => mockedCheckGitHubPAT(...args));

const mockedFetchPullRequests = jest.fn();
jest
  .spyOn(github, 'fetchPullRequests')
  .mockImplementation((...args) => mockedFetchPullRequests(...args));

describe('fetchGitHubPullRequests', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    mockedCheckGitHubPAT.mockImplementation(() => {});

    const expectedPullRequests = [
      {
        name: 'dummy pr 1',
      },
      {
        name: 'dummy pr 2',
      },
    ];
    mockedFetchPullRequests.mockImplementation(() => expectedPullRequests);

    await fetchGitHubPullRequests();

    expect(mockedCheckGitHubPAT.mock.calls.length).toBe(1);

    const pullRequests = readJsonSync(`${dir}/gitHubPullRequests.json`);
    expect(pullRequests).toEqual({
      pullRequests: expectedPullRequests,
    });
  });
});

import gitHubGraphqlFetchPullRequestsResponse from '@/services/sns/mocks/gitHubGraphqlFetchPullRequestsResponse.json';
import * as github from '@/services/sns/gitHub';
import * as constants from '@/constants';
import { fetchPullRequests, storePullRequests } from '@/services/sns/gitHub';
import { tempDir } from '@/test/helper';
import { existsSync, readJsonSync } from 'fs-extra';
import nock from 'nock';
import { vi } from 'vitest';

const mockedGraphQLClient = vi.fn();
vi
  .spyOn(github, 'createGraphQLClient')
  .mockImplementation(() => mockedGraphQLClient as never);

const mockedGetSNSDataPath = vi.fn();
vi
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

describe('fetchPullRequests', () => {
  test('PRが取得できる', async () => {
    mockedGraphQLClient.mockImplementation(() => {
      return gitHubGraphqlFetchPullRequestsResponse;
    });

    const pullRequests = await fetchPullRequests('yktakaha4');

    expect(pullRequests.length).toBe(2);
    expect((pullRequests[0].node as Record<string, unknown>).title).toBe(
      'fix pat',
    );
  });
});

describe('storePullRequests', () => {
  test('PRが保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const pullRequests = [
      {
        dummy: 'dummy',
      },
    ];
    await storePullRequests(pullRequests);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      pullRequests,
    });
  });
});

describe('checkGitHubPAT', () => {
  test('PATが適切なスコープを持っている', async () => {
    nock('https://api.github.com', {
      reqheaders: {
        authorization: (value) => value === 'Bearer dummy_github_pat',
      },
    })
      .get('/')
      .reply(
        200,
        {},
        {
          'x-oauth-scopes': 'public_repo',
        },
      );

    await expect(github.checkGitHubPAT()).resolves.toBeUndefined();
  });

  test('PATが適切なスコープを持っていない', async () => {
    nock('https://api.github.com', {
      reqheaders: {
        authorization: (value) => value === 'Bearer dummy_github_pat',
      },
    })
      .get('/')
      .reply(
        200,
        {},
        {
          'x-oauth-scopes': 'public_repo, repo',
        },
      );

    await expect(github.checkGitHubPAT()).rejects.toThrow(
      'Invalid scope: public_repo, repo',
    );
  });
});

import { graphql } from '@octokit/graphql';
import { getSNSDataPath } from '@/constants';
import dayjs from 'dayjs';
import { writeJson } from 'fs-extra';
import { logger } from '@/services/logging';

const pullRequestsLimit = 100;
const languagesLimit = 10;
const fetchPullRequestsQuery = `
query ($login: String!, $cursor: String) {
  user(login: $login) {
    pullRequests(first: ${pullRequestsLimit}, states: MERGED, orderBy: {field: UPDATED_AT, direction: DESC}, after: $cursor) {
      edges {
        node {
          id
          number
          title
          mergedAt
          permalink
          repository {
            id
            nameWithOwner
            url
            owner {
              login
            }
            isFork
            stargazerCount
            languages(first: ${languagesLimit}, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                node {
                  name
                  color
                }
                size
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

type FetchPullRequestsResponse = {
  user: {
    pullRequests: {
      edges: Array<Record<string, unknown>>;
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
};

export const createGraphQLClient = () => {
  return graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_PAT}`,
    },
  });
};

export const fetchPullRequests = async (login: string) => {
  logger.debug('start', { login });
  const client = createGraphQLClient();

  const pullRequests: Array<Record<string, unknown>> = [];
  const params: { cursor: string | null } = { cursor: null };
  while (true) {
    logger.debug('fetch', { params, total: pullRequests.length });
    const result = await client<FetchPullRequestsResponse>(
      fetchPullRequestsQuery,
      {
        login,
        cursor: params.cursor,
      },
    );
    pullRequests.push(...result.user.pullRequests.edges);
    logger.debug('fetched', { total: pullRequests.length });
    if (result.user.pullRequests.pageInfo.hasNextPage) {
      params.cursor = result.user.pullRequests.pageInfo.endCursor;
      continue;
    }
    break;
  }
  logger.debug('result', { total: pullRequests.length });
  return pullRequests;
};

export const storePullRequests = async (pullRequests: Array<unknown>) => {
  logger.debug('start', { count: pullRequests.length });
  const dataPath = getSNSDataPath('gitHubPullRequests');
  const data = {
    fetchedAt: dayjs().toISOString(),
    pullRequests,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};

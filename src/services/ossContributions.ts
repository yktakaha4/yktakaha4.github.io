import githubPullRequests from '@/services/sns/data/gitHubPullRequests.json';
import dayjs from 'dayjs';
import {
  getComponentsDataPath,
  gitHubIgnoreOwnerNames,
  gitHubLanguageSizeThreshold,
  gitHubStargazersCountThreshold,
  OSSContributionKind,
} from '@/constants';
import { writeJson } from 'fs-extra';
import { logger } from '@/services/logging';

export type OSSContribution = {
  title: string;
  mergedAt: Date;
  url: string;
  kind: OSSContributionKind;
  changedLines: number;
  repository: {
    owner: string;
    name: string;
    url: string;
    stars: number;
    languages: Array<string>;
  };
};

export const getOSSContributions = () => {
  const contributions = githubPullRequests.pullRequests
    .map(({ node }): OSSContribution => {
      const { title, permalink, mergedAt, repository } = node;
      const { nameWithOwner, stargazerCount, url, owner } = repository;

      const totalSize = repository.languages.edges.reduce(
        (acc, { size }) => acc + size,
        0,
      );
      const languages: Array<string> = [];
      for (const { node, size } of repository.languages.edges) {
        if (size / totalSize >= gitHubLanguageSizeThreshold) {
          const { name } = node;
          languages.push(name);
        }
      }

      return {
        title,
        url: permalink,
        kind: 'mergedPullRequest',
        mergedAt: dayjs(mergedAt).toDate(),
        changedLines: (node.additions || 0) + (node.deletions || 0),
        repository: {
          owner: owner.login,
          name: nameWithOwner,
          stars: stargazerCount,
          url,
          languages,
        },
      };
    })
    .filter(({ url, repository }) => {
      const { owner, stars } = repository;
      const visible =
        stars >= gitHubStargazersCountThreshold &&
        !gitHubIgnoreOwnerNames.includes(owner);
      logger.debug('filter', { url, visible });
      return visible;
    });

  return sortOSSContributions(contributions);
};

export const sortOSSContributions = (contributions: Array<OSSContribution>) => {
  return [...contributions].sort((lhs, rhs) => {
    if (rhs.mergedAt.getTime() === lhs.mergedAt.getTime()) {
      return rhs.changedLines - lhs.changedLines;
    } else {
      return rhs.mergedAt.getTime() - lhs.mergedAt.getTime();
    }
  });
};

export const storeOSSContributions = async (contributions: Array<unknown>) => {
  logger.debug('start', { count: contributions.length });
  const dataPath = getComponentsDataPath('ossContributions');
  const data = {
    contributions,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};

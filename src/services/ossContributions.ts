import githubPullRequests from '@/services/sns/data/gitHubPullRequests.json'
import dayjs from "dayjs";
import {
    getComponentsDataPath,
    gitHubIgnoreOwnerNames,
    gitHubLanguageSizeThreshold,
    gitHubStargazersCountThreshold, OSSContributionKind,
} from "@/constants";
import {writeJson} from "fs-extra";

export type OSSContribution = {
    title: string
    mergedAt: Date
    url: string
    kind: OSSContributionKind
    repository: {
        owner: string
        name: string
        url: string
        stars: number
        languages: Array<string>
    }
}

export const getOSSContributions = () => {
    const contributions = githubPullRequests.pullRequests.map(({ node }): OSSContribution => {
        const { title, permalink, mergedAt, repository } = node
        const { nameWithOwner, stargazerCount, url, owner } = repository

        const totalSize = repository.languages.edges.reduce((acc, { size }) => acc + size, 0)
        const languages: Array<string> = []
        for (const { node, size } of repository.languages.edges) {
            if (size / totalSize >= gitHubLanguageSizeThreshold) {
                const { name } = node
                languages.push(name)
            }
        }

        return {
            title,
            url: permalink,
            kind: 'mergedPullRequest',
            mergedAt: dayjs(mergedAt).toDate(),
            repository: {
                owner: owner.login,
                name: nameWithOwner,
                stars: stargazerCount,
                url,
                languages,
            },
        }
    }).filter(({ repository }) => {
        const { owner, stars } = repository
        return stars >= gitHubStargazersCountThreshold && !gitHubIgnoreOwnerNames.includes(owner)
    })

    return sortOSSContributions(contributions)
}

export const sortOSSContributions = (contributions: Array<OSSContribution>) => {
    return [...contributions].sort((lhs, rhs) => {
        return rhs.mergedAt.getTime() - lhs.mergedAt.getTime()
    })
}

export const storeOSSContributions = async (contributions: Array<unknown>) => {
    const dataPath = getComponentsDataPath('ossContributions')
    const data = {
        storedAt: dayjs().toISOString(),
        contributions,
    }
    await writeJson(dataPath, data, {spaces: 2})
}

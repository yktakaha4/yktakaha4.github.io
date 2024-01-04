import gitHubGraphqlFetchPullRequestsResponse from "@/services/sns/mocks/gitHubGraphqlFetchPullRequestsResponse.json";
import * as github from '@/services/sns/gitHub';
import * as constants from "@/constants";
import {fetchPullRequests, storePullRequests} from "@/services/sns/gitHub";
import {tempDir} from "@/jest/helper";
import {existsSync, readJsonSync} from "fs-extra";

const mockedGraphQLClient = jest.fn()
jest.spyOn(github, 'createGraphQLClient').mockImplementation(() => mockedGraphQLClient as never)

const mockedGetSNSDataPath = jest.fn()
jest.spyOn(constants, 'getSNSDataPath').mockImplementation(() => mockedGetSNSDataPath() as never)

describe('fetchPullRequests', () => {
    test('PRが取得できる', async () => {
        mockedGraphQLClient.mockImplementation(() => {
            return gitHubGraphqlFetchPullRequestsResponse
        })

        const pullRequests = await fetchPullRequests('yktakaha4')

        expect(pullRequests.length).toBe(2)
        expect((pullRequests[0].node as Record<string, unknown>).title).toBe('fix pat')
    })
})

describe('storePullRequests', () => {
    test('PRが保存できる', async () => {
        const dir = tempDir()
        const mockedJsonPath = `${dir}/dummy.json`
        mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath)

        const pullRequests = [{
            dummy: 'dummy',
        }]
        await storePullRequests(pullRequests)

        expect(existsSync(mockedJsonPath)).toBeTruthy()
        expect(readJsonSync(mockedJsonPath)).toEqual({
            fetchedAt: expect.any(String),
            pullRequests,
        })
    })
})

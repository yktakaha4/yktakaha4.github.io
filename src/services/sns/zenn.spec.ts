import {scrapeTopics, storeTopics} from "@/services/sns/zenn";
import {tempDir} from "@/jest/helper";
import {existsSync, readJsonSync} from "fs-extra";

const mockedGetSNSDataPath = jest.fn()
jest.mock('@/constants', () => ({
    getSNSDataPath: () => mockedGetSNSDataPath(),
}))

describe('scrapeTopics', () => {
    test('記事ごとのトピックが取得できる', async () => {
        const articlesDirectoryPath = `${__dirname}/mocks/zennArticleMarkdowns`
        const topics = await scrapeTopics(articlesDirectoryPath)

        expect(topics).toEqual([
            {
                slug: 'access_eks_with_github_actions_oidc',
                topics: ['Terraform', 'GitHub Actions', 'Kubernetes', 'AWS'],
                published: true,
            },
            {
                slug: 'how_to_make_ansi_art',
                topics: ['Python', 'ANSI art'],
                published: true,
            },
        ])
    })

    describe('バリデーションエラー', () => {
        test('記事ディレクトリが存在しない', async () => {
            const articlesDirectoryPath = `${__dirname}/mocks/notFoundDirectory`
            await expect(scrapeTopics(articlesDirectoryPath)).rejects.toThrow('Directory not found')
        })
    })
})

describe('storeTopics', () => {
    test('トピックが保存できる', async () => {
        const dir = tempDir()
        const mockedJsonPath = `${dir}/zennTopics.json`
        mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath)

        const topics = [{
            dummy: 'dummy',
        }]
        await storeTopics(topics)

        expect(existsSync(mockedJsonPath)).toBeTruthy()
        expect(readJsonSync(mockedJsonPath)).toEqual({
            fetchedAt: expect.any(String),
            topics,
        })
    })
})

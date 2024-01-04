import {getTechArticles, sortTechArticles, storeTechArticles, TechArticle} from "@/services/techArticles";
import * as constants from "@/constants";
import {tempDir} from "@/jest/helper";
import {existsSync, readJsonSync} from "fs-extra";

const mockedGetComponentsDataPath = jest.fn()
jest.spyOn(constants, 'getComponentsDataPath').mockImplementation(() => mockedGetComponentsDataPath() as never)

describe('getTechArticles', () => {
    test('技術記事が取得できる', () => {
        const articles = getTechArticles()
        expect(articles.length).toBeGreaterThan(70)
        expect(articles.filter(a => a.publisher === 'zenn' && a.tags.length > 0).length).toBeGreaterThan(0)
        expect(articles.filter(a => a.publisher === 'qiita' && a.tags.length > 0).length).toBeGreaterThan(0)
        expect(articles.filter(a => a.publisher === 'speakerDeck').length).toBeGreaterThan(0)
        expect(articles.filter(a => a.publisher === 'note').length).toBeGreaterThan(0)
        expect(articles.filter(a => a.publisher === 'techBlog').length).toBeGreaterThan(0)
    })
})

describe('sortTechArticles', () => {
    test('技術記事がソートできる', () => {
        const defaultValues: TechArticle = {
            title: 'dummy',
            url: 'https://dummy.com',
            likes: 0,
            publishedAt: new Date(),
            publisher: 'zenn',
            tags: ['dummy'],
        }

        const articles = [{
            ...defaultValues,
            title: 'dummy1',
            likes: 2,
            publishedAt: new Date('2021-01-01'),
        }, {
            ...defaultValues,
            title: 'dummy2',
            likes: 1,
            publishedAt: new Date('2021-01-01'),
        }, {
            ...defaultValues,
            title: 'dummy3',
            likes: 2,
            publishedAt: new Date('2021-01-02'),
        }]

        const sorted = sortTechArticles(articles, 'likes desc, publishedAt desc')
        expect(sorted.length).toBe(articles.length)
        expect(sorted[0].title).toBe('dummy3')
        expect(sorted[1].title).toBe('dummy1')
        expect(sorted[2].title).toBe('dummy2')

        expect(sorted).not.toEqual(articles)
    })
})

describe('storeTechArticles', () => {
    test('技術記事が保存できる', async () => {
        const dir = tempDir()
        const mockedJsonPath = `${dir}/dummy.json`
        mockedGetComponentsDataPath.mockImplementation(() => mockedJsonPath)

        const articles = [{
            dummy: 'dummy',
        }]
        await storeTechArticles(articles)

        expect(existsSync(mockedJsonPath)).toBeTruthy()
        expect(readJsonSync(mockedJsonPath)).toEqual({
            storedAt: expect.any(String),
            articles,
        })
    })
})

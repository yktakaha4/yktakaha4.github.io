import { removeAllTempDirs, tempDir, uuid } from '@/test/helper';
import { existsSync, readdirSync } from 'fs-extra';

describe('uuid', () => {
  test('uuidが取得できる', () => {
    const id1 = uuid();
    expect(id1).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);

    const id2 = uuid();
    expect(id2).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);

    expect(id1).not.toBe(id2);
  });
});

describe('tempDir', () => {
  test('一時ディレクトリが取得できる', () => {
    const dir1 = tempDir();
    expect(existsSync(dir1)).toBeTruthy();
    expect(readdirSync(dir1).length).toBe(0);

    const dir2 = tempDir();
    expect(existsSync(dir2)).toBeTruthy();
    expect(readdirSync(dir2).length).toBe(0);

    expect(dir1).not.toBe(dir2);
  });
});

describe('removeAllTempDirs', () => {
  test('一時ディレクトリが削除される', () => {
    const dir1 = tempDir();
    const dir2 = tempDir();

    expect(existsSync(dir1)).toBeTruthy();
    expect(existsSync(dir2)).toBeTruthy();

    removeAllTempDirs();

    expect(existsSync(dir1)).toBeFalsy();
    expect(existsSync(dir2)).toBeFalsy();
  });
});

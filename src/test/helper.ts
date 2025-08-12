import * as os from 'os';
import * as crypto from 'crypto';
import { mkdirpSync, readdirSync, rmSync } from 'fs-extra';
import * as process from 'process';

export const uuid = () => crypto.randomUUID();

const baseTempDir = os.tmpdir();
if (!baseTempDir) {
  throw new Error('Failed to get baseTempDir');
}

const tempDirPrefix = `__capy${process.pid}__`;
export const tempDir = () => {
  const dir = `${baseTempDir}/${tempDirPrefix}${uuid()}`;
  mkdirpSync(dir);
  return dir;
};

export const removeAllTempDirs = () => {
  try {
    const dirs = readdirSync(baseTempDir);
    for (const dir of dirs) {
      if (dir.startsWith(tempDirPrefix)) {
        rmSync(`${baseTempDir}/${dir}`, { recursive: true });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

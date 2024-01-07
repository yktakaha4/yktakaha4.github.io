import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export const rootDirectoryName = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
);

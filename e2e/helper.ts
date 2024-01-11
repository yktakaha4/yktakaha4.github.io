import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export const rootDirectoryName = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
);

const externalUrlRegexp = /https?:\/\/((?:[\w-]+\.)+\w{2,})/i;
export const isExternalLink = (link: string) => externalUrlRegexp.test(link);

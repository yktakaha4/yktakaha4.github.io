import { defineConfig } from 'vitest/config';
import config from './vitest.config.mjs'

export default defineConfig({
  ...config,
  test: {
    ...config.test,
    include: ['e2e/**/*.{spec,test}.{ts,tsx}'],
    coverage: {
      enabled: false,
    },
  },
});

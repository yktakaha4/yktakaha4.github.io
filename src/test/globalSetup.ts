import nock from 'nock';
import { cleanup } from '@testing-library/react';
import { removeAllTempDirs } from './helper';

export const setup = () => {
  nock.disableNetConnect();
  cleanup();
};

export const teardown = () => {
  removeAllTempDirs();
};

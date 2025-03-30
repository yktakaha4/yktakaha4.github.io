import 'jest';
import * as matchers from '@testing-library/jest-dom/matchers';
import 'jest-location-mock';
import 'cross-fetch/polyfill';

// @ts-ignore
expect.extend(matchers);

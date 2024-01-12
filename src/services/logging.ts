import log4js from 'log4js';
import util from 'util';
import * as process from 'process';

const logLayout = {
  type: 'pattern',
  pattern: '%[%d %p %f{1}:%l %x{singleLine}%]',
  tokens: {
    singleLine: function (logEvent: { data: Array<unknown> }) {
      return logEvent.data
        .map((d) => {
          if (
            typeof d === 'boolean' ||
            typeof d === 'number' ||
            typeof d === 'string'
          ) {
            return d.toString().replace(/\n/gm, '\\n');
          } else {
            return util
              .inspect(d, { breakLength: Infinity })
              .replace(/\n/gm, '\\n');
          }
        })
        .filter((d) => d.length > 0)
        .join(' ');
    },
  },
};

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: logLayout,
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: !!process.env.DEBUG ? 'debug' : 'info',
      enableCallStack: true,
    },
  },
});

export const logger = log4js.getLogger();

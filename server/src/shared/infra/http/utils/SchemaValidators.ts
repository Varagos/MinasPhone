import { query } from 'express-validator';

const querySortMiddleware = () => {
  return query('sort')
    .optional()
    .custom((value) => {
      const sort = JSON.parse(value);
      if (sort.length !== 2) {
        return Promise.reject('Sort must be an array of 2 elements');
      }
      if (typeof sort[0] !== 'string') {
        return Promise.reject('Sort field must be a string');
      }
      if (!['ASC', 'DESC'].includes(sort[1])) {
        return Promise.reject('Sort order must be ASC or DESC');
      }
      return Promise.resolve();
    })
    .customSanitizer((value) => {
      return JSON.parse(value);
    });
};

const queryRangeMiddleware = () => {
  return query('range')
    .optional()
    .custom((value) => {
      const range = JSON.parse(value);
      if (range.length !== 2) {
        return Promise.reject('Range must be an array of 2 elements');
      }
      if (typeof range[0] !== 'number' || typeof range[1] !== 'number') {
        return Promise.reject('Range must be an array of 2 numbers');
      }
      return Promise.resolve();
    })
    .customSanitizer((value) => {
      return JSON.parse(value);
    });
};

const queryFilterMiddleware = () => {
  return query('filter', 'Filter must be a valid JSON string')
    .optional()
    .isJSON()
    .customSanitizer((value) => {
      return JSON.parse(value);
    });
};

const jsonSanitizer = (value: any) => {
  return JSON.parse(value);
};

export {
  querySortMiddleware,
  queryRangeMiddleware,
  queryFilterMiddleware,
  jsonSanitizer,
};

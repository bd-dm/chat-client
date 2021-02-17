/* eslint-disable import/first */
require('dotenv').config();

import config from '../../config';

import { generate } from '@graphql-codegen/cli';

(async () => {
  await generate(
    {
      schema: config.apiHost,
      documents: '',
      generates: {
        [`${process.cwd()}/src/definitions/graphql.ts`]: {
          plugins: ['typescript'],
        },
      },
    },
    true,
  );
})();

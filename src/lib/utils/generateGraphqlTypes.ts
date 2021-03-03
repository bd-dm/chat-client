/* eslint-disable import/first */
require('dotenv').config();

import { generate } from '@graphql-codegen/cli';

import config from '../../config';

(async () => {
  await generate(
    {
      schema: config.apiGraphqlHost,
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

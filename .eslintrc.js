module.exports = {
    extends: ['airbnb'],
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    parser: '@typescript-eslint/parser',
    rules: {
        camelcase: 0,
        'consistent-return': 0,
        'default-case': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': [
            'error', {
                'devDependencies': [
                    '**/*.test.ts',
                    '**/*.test.tsx',
                    '**/*.spec.js'
                ]
            }
        ],
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'react/jsx-sort-props': [
            'error',
            {
                callbacksLast: true,
                shorthandLast: true,
                ignoreCase: false,
                noSortAlphabetically: false,
            },
        ],
        'no-alert': 0,
        'no-console': 0,
        'no-continue': 0,
        'no-restricted-globals': 0,
        'no-restricted-syntax': 0,
        'no-undef': 0,
        'no-underscore-dangle': 0,
        "no-unused-vars": [2, {"args": "after-used", "argsIgnorePattern": "^_"}],
        '@typescript-eslint/no-unused-vars': [2, {"args": "after-used", "argsIgnorePattern": "^_"}],
        'no-use-before-define': 0,
        'react/button-has-type': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'react/no-children-prop': 0,
        'react/self-closing-comp': 0,
        'react/no-access-state-in-setstate': 0,
        'implicit-arrow-linebreak': 0,
        'no-plusplus': 0,
        'no-useless-constructor': 0,
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-dupe-class-members': 0,
        'import/order': 'off',
        'simple-import-sort/sort': [
            'error',
            {
                groups: [
                    ['^\\u0000'],
                    ['^react'],
                    ['^next'],
                    ['^\\w'],
                    ['^@\\w'],
                    ['^@/api\\/?\\w'],
                    ['^@/assets\\/?\\w'],
                    ['^@/components\\/?\\w'],
                    ['^@/definitions\\/?\\w'],
                    ['^@/lib\\/?\\w'],
                    ['^@/models\\/?\\w'],
                    ['^@/pages\\/?\\w'],
                    ['^\\.'],
                    ['^[^.]'],
                ],
            },
        ],
        'sort-imports': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1, maxBOF: 1}],
        'react/jsx-one-expression-per-line': 0,
    },
};

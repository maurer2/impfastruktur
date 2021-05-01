module.exports = {
    env: {
        "browser": true,
        "es6": true
    },
    extends: [
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": [".tsconfig.json"],
    },
    plugins: [
        'svelte3'
    ],
    overrides: [{
        files: ['*.svelte'],
        processor: 'svelte3/svelte3'
    }],
    settings: {
        'svelte3/typescript': true,
    },
    rules: {}
};
## Contributing

Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from master.
2. Run `npm run build`. This will:
    1. Run `npm install` in the repository root.
    2. Ensure the test suite passes with `npm test`.
    3. Format your code with prettier and eslint using `npm run lint`.
3. If you’ve fixed a bug or added code that should be tested, add tests!

Tip: `npm run mocha -- --grep "test name"` is helpful in development.

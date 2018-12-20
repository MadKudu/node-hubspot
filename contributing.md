## Contributing

Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from master.
1. Run `npm build`. This will:
   a. Run `npm install` in the repository root.
   a. Ensure the test suite passes with`npm test`.
   a. Format your code with prettier and eslint using `npm run lint`.

1. If you’ve fixed a bug or added code that should be tested, add tests!

Tip: `npm run mocha -- --grep "test name"` is helpful in development.

# yktakaha4.github.io

## Development

```shell
# Install dependencies
npm install

# Start development server
npm run start

# Fix code styles
npm run fix

# Run tests
npm run test

# Run E2E tests
npm run build
npm run generate:pdf
npm run test:e2e
```

## Update data

```shell
# Set environment variables
cp -p .envrc.example .envrc
direnv allow

npm run refresh-components-data
```

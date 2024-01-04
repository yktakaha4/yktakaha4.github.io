# yktakaha4.github.io

## Development

```shell
# Install dependencies
yarn install

# Start development server
yarn start

# Fix code styles
yarn fix

# Run tests
yarn test
```

## Update data

```shell
# Set environment variables
cp -p .envrc.example .envrc
direnv allow

yarn refresh-components-data
```

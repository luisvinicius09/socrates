## Run E2E tests

- Make sure that database is running on docker

- Using NPM (default)
  npm run test:e2e

- Using PNPM
  pnpm link ./prisma/vitest-environment-prisma
  pnpm test:e2e
